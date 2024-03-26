import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TrainingExercise, TrainingPlan } from 'src/app/data/interfaces/plan.model';
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

  exercises: TrainingExercise[] = []

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



  savePlan(): void {

    if (this.planFormGroup.valid && this.secondPlanFormGroup.valid) {
      const formDataFirst = this.planFormGroup.value
      const formDataSecond = this.secondPlanFormGroup.value


      const combinedFormData = {
        age: formDataFirst.age ?? 0,
        bodyWeight: formDataFirst.bodyWeight ?? 0,
        sex: formDataFirst.sex ?? '',
        squat: formDataFirst.squat ?? 0,
        bench: formDataFirst.bench ?? 0,
        deadlift: formDataFirst.deadlift ?? 0,
        tested: formDataFirst.tested ?? true,
        experience: formDataFirst.exp ?? '',
        planName: formDataSecond.planName ?? '',
        planType: formDataSecond.planType ?? '',
        description: formDataSecond.description ?? '',
        numberOfTrainings: formDataSecond.numberOfTrainings ?? 0,
        durationWeeks: formDataSecond.durationWeeks ?? 0,
        performanceResults: { bench: formDataFirst.bench ?? 0, squat: formDataFirst.squat ?? 0, deadlift: formDataFirst.deadlift ?? 0, },
      };
      this.sbService.generateTrainingExercises(combinedFormData).subscribe(res => {
        const planData: TrainingPlan = {
          planName: combinedFormData.planName,
          planType: combinedFormData.planType,
          experience: combinedFormData.experience,
          description: combinedFormData.description,
          durationWeeks: combinedFormData.durationWeeks,
          performanceResults: combinedFormData.performanceResults,
          trainingDays: res,
        }
        console.log(planData)
      })
    }
  }

  getTrainingExercises(): void {
    this.exercises = []
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
        experience: formData.exp ?? ''
      };

      this.sbService.generateTrainingExercises(userData).subscribe(res => {
        this.exercises = res
        console.log(this.exercises)
      })
    }
  }


}
