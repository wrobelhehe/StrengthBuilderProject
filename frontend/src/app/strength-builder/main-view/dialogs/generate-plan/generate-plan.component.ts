import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { Exercise } from 'src/app/data/interfaces/exercises.model';
import { ExerciseSet, TrainingExercise } from 'src/app/data/interfaces/plan.model';
import { EXPERIENCE, TYPES } from 'src/app/data/mocks/plans-mocks';
import { StrengthBuilderService, UserData } from 'src/app/data/services/strength-builder.service';

@Component({
  selector: 'app-generate-plan',
  templateUrl: './generate-plan.component.html',
  styleUrls: ['./generate-plan.component.scss']
})
export class GeneratePlanComponent {

  experience = EXPERIENCE;

  types = TYPES;

  trainingDays: number[] = [3, 4, 5, 6];

  planFormGroup = this.fb.group({
    age: [null, [Validators.required, Validators.min(10), Validators.max(100)]],
    sex: ['m', Validators.required],
    bodyWeight: [null, [Validators.required, Validators.min(35), Validators.max(250)]],
    squat: [null, [Validators.required, Validators.min(20), Validators.max(500)]],
    bench: [null, [Validators.required, Validators.min(20), Validators.max(370)]],
    deadlift: [null, [Validators.required, Validators.min(20), Validators.max(550)]],
    tested: [true, Validators.required],
    exp: ['', Validators.required]
  })

  secondPlanFormGroup = this.fb.group({
    planName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    planType: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],
    numberOfTrainings: [null, [Validators.required, Validators.min(3), Validators.max(6)]],
    durationWeeks: [4, [Validators.required, Validators.min(4), Validators.max(53)]],
  })

  constructor(private fb: FormBuilder, private sbService: StrengthBuilderService, private toast: ToastrService, private modal: NgbModal, private translate: TranslateService, private firestore: AngularFirestore) {
  }



  getUserWeakness() {
    if (this.planFormGroup.valid) {
      const formData = this.planFormGroup.value
      const userData: UserData = {
        age: formData.age ?? 0,
        bodyWeight: formData.bodyWeight ?? 0,
        sex: formData.sex ?? '',
        squat: formData.squat ?? 0,
        bench: formData.bench ?? 0,
        deadlift: formData.deadlift ?? 0,
        tested: formData.tested ?? true,
      };
      this.sbService.getUserWeakness(userData).subscribe(res => {
        console.log(res);
      })
    } else {
      this.getRandomExercises().subscribe(exercises => {
        const experienceLevel: 'beginner' | 'intermediate' | 'advanced' = 'advanced';
        const trainingExercises = this.generateTrainingExercises(exercises, experienceLevel);
        console.log(trainingExercises);
      });

    }
  }

  generateTrainingExercises(exercises: Exercise[], experience: 'beginner' | 'intermediate' | 'advanced', userRatios: any = { bench: 1, squat: 1.4, deadlift: 1.7 }): TrainingExercise[] {
    const trainingExercises: any[] = [];
    let upperSiSum = 0;
    let lowerSiSum = 0;
    let stressForWeakerLiftSum = 0;
    let stressForStrongerLiftSum = 0;

    const { squat, deadlift } = userRatios;
    let { upperSi, lowerSi } = this.analyzeLifts(userRatios, experience);

    const strongerLift = squat < deadlift ? 'squat' : 'deadlift';
    const weakerLift = strongerLift === 'squat' ? 'deadlift' : 'squat';

    const lowerSiSumTargetForStrongerLift = lowerSi * 0.40;
    const lowerSiSumTargetForWeakerLift = lowerSi * 0.60;
    const errorMargin = 0.05;
    const lowerSiWithMarginForStrongerLift = lowerSiSumTargetForStrongerLift * (1 + errorMargin);
    const lowerSiWithMarginForWeakerLift = lowerSiSumTargetForWeakerLift * (1 + errorMargin);

    exercises.forEach(exercise => {
      const sets = this.generateRandomSeriesSet(exercise.coeff, experience, this.seriesParamsMap);
      if (sets) {
        const exerciseStress = sets.reduce((acc, set) => acc + this.calculateTotalStress(set), 0);

        let addToPlan = false;
        if (exercise.category.includes('bench') && upperSiSum + exerciseStress <= upperSi) {
          upperSiSum += exerciseStress;
          addToPlan = true;
        } else if (exercise.category.includes(weakerLift) && stressForWeakerLiftSum + exerciseStress <= lowerSiWithMarginForWeakerLift) {
          stressForWeakerLiftSum += exerciseStress;
          lowerSiSum += exerciseStress;
          addToPlan = true;
        } else if (exercise.category.includes(strongerLift) && stressForStrongerLiftSum + exerciseStress <= lowerSiWithMarginForStrongerLift) {
          stressForStrongerLiftSum += exerciseStress;
          lowerSiSum += exerciseStress;
          addToPlan = true;
        } else if (!['bench', 'deadlift', 'squat'].some(cat => exercise.category.includes(cat))) {
          addToPlan = true;
        }

        if (addToPlan) {
          trainingExercises.push({
            name: exercise.name,
            videoUrl: exercise.videoUrl,
            description: exercise.description,
            sets: sets,
          });
        }
      }
    });

    console.log(`Upper body stress index (upperSiSum): ${upperSiSum}, Target Upper SI: ${upperSi}`);
    console.log(`Lower body stress index (lowerSiSum): ${lowerSiSum}, ${weakerLift} Stress: ${stressForWeakerLiftSum}, ${strongerLift} Stress: ${stressForStrongerLiftSum}, Target Lower SI: ${lowerSi}`);
    return trainingExercises;
  }

  getRandomExercises(): Observable<any[]> {
    return this.firestore.collection('exercises', ref =>
      ref.where('type', 'array-contains', 'powerlifting')
    ).valueChanges().pipe(
      map(exercises => {
        const competitionLifts = this.filterAndShuffleExercises(exercises, true, 1);
        const nonCompetitionLiftsOne = this.filterAndShuffleExercises(exercises, false, 1);
        const nonCompetitionLiftsTwo = this.filterAndShuffleExercises(exercises, false, 0.75);
        const nonCompetitionLiftsThree = this.filterAndShuffleExercises(exercises, false, 0.5);
        const nonCompetitionLiftsFour = this.filterAndShuffleExercises(exercises, false, 0.25);


        const selectedExercises = [
          ...this.selectExercises(competitionLifts, ['squat', 'deadlift', 'bench']),
          ...this.selectExercises(nonCompetitionLiftsOne, ['squat', 'deadlift', 'bench', 'bench', 'bench']),
          ...this.selectExercises(nonCompetitionLiftsTwo, ['squat', 'deadlift', 'bench', 'bench', 'bench']),
          ...this.selectExercises(nonCompetitionLiftsThree, ['squat', 'deadlift', 'bench', 'bench', 'row', 'row', 'row', 'row']),
          ...this.selectExercises(nonCompetitionLiftsFour, ['squat', 'deadlift', 'bench', 'core', 'core']),
        ];
        return selectedExercises;
      })
    );
  }

  private filterAndShuffleExercises(exercises: any[], isCompetitionLift: boolean, coeff: number): Exercise[] {
    return this.shuffleArray(exercises.filter(exercise =>
      exercise.isCompetitionLift === isCompetitionLift && exercise.coeff === coeff
    ));
  }

  private selectExercises(exercises: Exercise[], categories: string[]): Exercise[] {
    const selectedExercises: Exercise[] = [];

    categories.forEach(category => {
      const foundExercise = exercises.find(exercise => exercise.category.includes(category));
      if (foundExercise) {
        selectedExercises.push(foundExercise);
        exercises.splice(exercises.indexOf(foundExercise), 1);
      }
    });


    return selectedExercises;
  }

  private shuffleArray(array: any[]): any[] {
    array.forEach((element, index) => {
      const j = Math.floor(Math.random() * (index + 1));
      [array[index], array[j]] = [array[j], array[index]];
    });
    return array;
  }



  analyzeLifts(ratios: any, experience: any): any {
    const { squat, bench, deadlift } = ratios;
    const lowestRatioName = bench <= squat && bench <= deadlift ? 'other' : 'bench';

    console.log(lowestRatioName)
    const siValuesForExperience = this.siValuesMap[experience];
    if (!siValuesForExperience) throw new Error('Invalid experience level');

    return siValuesForExperience[lowestRatioName];
  }



  calculateTotalStress(set: ExerciseSet): number {
    const { reps, rpe } = set
    const stressTable: StressTable = this.stressTable

    const rpeKey: string = rpe.toFixed(1);

    const stressValues = stressTable[rpeKey];
    if (!stressValues) {
      console.error("Invalid RPE value.");
      return 0;
    }
    if (reps < 1 || reps > stressValues.length) {
      console.error("Reps out of bounds.");
      return 0;
    }

    return stressValues[reps - 1];
  }

  generateRandomSeriesSet(key: number, experience: 'beginner' | 'intermediate' | 'advanced', seriesParamsMap: Map<number, any>): ExerciseSet[] | null {
    const adjustments = {
      'beginner': { stressAdjustment: -0.25, rpeRange: [6, 8] },
      'intermediate': { stressAdjustment: 0, rpeRange: [7, 8] },
      'advanced': { stressAdjustment: 0.5, rpeRange: [7, 8, 9] },
    };

    let adjustedSeriesParamsMap = new Map();
    seriesParamsMap.forEach((value, key) => {
      let adjustedValue = {
        ...value,
        stress: value.stress + adjustments[experience].stressAdjustment,
        rpeRange: adjustments[experience].rpeRange
      };
      adjustedSeriesParamsMap.set(key, adjustedValue);
    });

    const params = adjustedSeriesParamsMap.get(key);
    if (!params) return null;

    const seriesSet: ExerciseSet[] = [];
    let totalStress = 0;

    if (key === 1 || key === 2) {
      const firstSet: ExerciseSet = {
        reps: 1,
        rpe: this.randomIntFromInterval(params.rpeRange[0], params.rpeRange[1]),
        weight: 0,
        tempo: this.randomElementFromArray(params.tempo),
        rest: this.roundToNearest(this.randomIntFromInterval(params.restRange[0], params.restRange[1]), 30)
      };

      let firstSetStress = this.calculateTotalStress(firstSet);
      if (firstSetStress !== undefined) {
        seriesSet.push(firstSet);
        totalStress += firstSetStress;
      }
    }

    const reps = this.randomIntFromInterval(params.repsRange[0], params.repsRange[1]);
    const rpe = this.randomIntFromInterval(params.rpeRange[0], params.rpeRange[1]);
    const rest = this.roundToNearest(this.randomIntFromInterval(params.restRange[0], params.restRange[1]), 30);
    const tempo = this.randomElementFromArray(params.tempo);

    while (totalStress < params.stress + 0.5) {
      const newSet = { reps, rpe, weight: params.weight, tempo, rest } as ExerciseSet;
      const stress = this.calculateTotalStress(newSet);

      if (totalStress + stress > params.stress + 0.5) break;

      seriesSet.push(newSet);
      totalStress += stress;
    }

    return seriesSet.length > 0 ? seriesSet : null;
  }

  randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomElementFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
  roundToNearest(value: number, nearest: number): number {
    return Math.round(value / nearest) * nearest;
  }

  siValuesMap: Record<any, Record<string, any>> = {
    beginner: {
      bench: { upperSi: 18, lowerSi: 13 },
      other: { upperSi: 15, lowerSi: 17 },
    },
    intermediate: {
      bench: { upperSi: 23, lowerSi: 17 },
      other: { upperSi: 19, lowerSi: 21 },
    },
    advanced: {
      bench: { upperSi: 30, lowerSi: 23 },
      other: { upperSi: 23, lowerSi: 26 },
    },
  };

  stressTable: StressTable = {
    "10.0": [1.2, 1.2, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2, 1.1, 1.1, 1.0, 1.0],
    "9.5": [1.0, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.1, 1.1, 1.1, 1.0, 1.0, 0.9, 0.9, 0.9],
    "9.0": [0.9, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.9, 0.9, 0.9, 0.8, 0.8, 0.7],
    "8.5": [0.8, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.8, 0.8, 0.8, 0.7, 0.7, 0.6],
    "8.0": [0.7, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.7, 0.7, 0.7, 0.6, 0.6, 0.6],
    "7.5": [0.6, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.6, 0.6, 0.6, 0.6, 0.5, 0.5],
    "7.0": [0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.4],
    "6.5": [0.5, 0.5, 0.5, 0.6, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4],
    "6.0": [0.4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3],
    "5.5": [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3],
    "5.0": [0.3, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.2, 0.2],
  };

  seriesParamsMap: Map<number, any> = new Map([
    [2, {
      stress: 4,
      rpeRange: [8, 9],
      repsRange: [3, 10],
      tempo: ["2111", "2010", "3010", "2020"],
      weight: 0,
      restRange: [360, 420]
    }],
    [1, {
      stress: 3,
      rpeRange: [7, 8, 9],
      repsRange: [3, 10],
      tempo: ["2111", "2010", "3010", "2020"],
      weight: 0,
      restRange: [240, 360]
    }],
    [0.75, {
      stress: 2,
      rpeRange: [7, 8, 9],
      repsRange: [6, 12],
      tempo: ["2111", "2010", "3010", "2020"],
      weight: 0,
      restRange: [240, 360]
    }],
    [0.5, {
      stress: 1,
      rpeRange: [8, 9],
      repsRange: [6, 12],
      tempo: ["2111", "2010", "3010", "2020"],
      weight: 0,
      restRange: [180, 240]
    }],
    [0.25, {
      stress: 0.75,
      rpeRange: [6, 9],
      repsRange: [3, 10],
      tempo: ["2111", "2010", "3010", "2020"],
      weight: 0,
      restRange: [120, 180]
    }],
  ]);


}

type StressTable = Record<string, number[]>;