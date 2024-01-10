import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogClose } from '../../abstracts/dialog-close.abstract';
import { FormBuilder, Validators } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-calories-calc',
  templateUrl: './calories-calc.component.html',
  styleUrls: ['./calories-calc.component.scss']
})
export class CaloriesCalcComponent extends DialogClose {


  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
      tooltip: {
        titleColor: 'white',
        bodyColor: 'white',
      },
    },
  };
  public pieChartLabels = [this.translate.instant('protein_label'),
  this.translate.instant('fat_label'),
  this.translate.instant('carbs_label')];
  public pieChartDatasets = [{
    data: [0, 0, 0]
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  isCalculated: boolean = false;

  goalText!: string;

  caloricRequirement: number = 0

  personalFormGroup = this.formBuilder.group({
    weight: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
    height: ['', [Validators.required, Validators.min(1), Validators.max(280)]],
    age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
    gender: ['m', Validators.required],
  })

  activityFormGroup = this.formBuilder.group({
    activity: [0, Validators.required],
  });

  goalFormGroup = this.formBuilder.group({
    goal: [0, Validators.required],
  });

  activities: any[] = [
    { value: 0, translation: 'activity-0', description: 'activity-0-desc' },
    { value: 1, translation: 'activity-1', description: 'activity-1-desc' },
    { value: 2, translation: 'activity-2', description: 'activity-2-desc' },
    { value: 3, translation: 'activity-3', description: 'activity-3-desc' },
    { value: 4, translation: 'activity-4', description: 'activity-4-desc' },

  ];

  goals: any[] = [
    { value: 0, translation: 'goal-0' },
    { value: 1, translation: 'goal-1' },
    { value: 2, translation: 'goal-2' },

  ];


  constructor(dialogRef: MatDialogRef<any>, private formBuilder: FormBuilder, private translate: TranslateService,) {
    super(dialogRef)
  }

  resetCalculator() {
    this.isCalculated = false;
    this.personalFormGroup.reset()
    this.activityFormGroup.reset()
    this.goalFormGroup.reset()
  }

  getGoalText(): string {
    const goalValue: any = this.goalFormGroup.get('goal')?.value;
    console.log(goalValue)
    switch (goalValue) {
      case 0:
        return 'goal-0-desc';
      case 1:
        return 'goal-1-desc';
      case 2:
        return 'goal-2-desc';
      default:
        return '';
    }
  }

  calculateCaloricRequirement() {
    this.isCalculated = true;
    const weight: any = this.personalFormGroup.get('weight')?.value;
    const height: any = this.personalFormGroup.get('height')?.value;
    const age: any = this.personalFormGroup.get('age')?.value;
    const gender: any = this.personalFormGroup.get('gender')?.value;
    const activityLevel: any = this.activityFormGroup.get('activity')?.value;
    const goal: any = this.goalFormGroup.get('goal')?.value;

    let bmr: number;

    if (gender === 'm') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

    }

    let calorieChangePercent = 0;
    if (goal === 0) {
      calorieChangePercent = -0.10;
    } else if (goal === 2) {
      calorieChangePercent = 0.10;
    }

    const activityMultiplier = [1.2, 1.375, 1.55, 1.725, 1.9][activityLevel];
    this.caloricRequirement = Math.round(bmr * activityMultiplier);
    this.caloricRequirement = Math.round(this.caloricRequirement * (1 + calorieChangePercent));
    this.calculateMacros(weight);
    this.goalText = this.getGoalText()
  }

  private calculateMacros(weight: number) {
    const proteinPerKg = 2;
    const fatCaloriePercent = 0.25;
    const caloriePerGramOfProtein = 4;
    const caloriePerGramOfFat = 9;
    const caloriePerGramOfCarb = 4;

    const proteinGrams = Math.round(weight * proteinPerKg);
    const proteinCalories = Math.round(proteinGrams * caloriePerGramOfProtein);

    const fatCalories = Math.round(this.caloricRequirement * fatCaloriePercent);
    const fatGrams = Math.round(fatCalories / caloriePerGramOfFat);

    const carbCalories = Math.round(this.caloricRequirement - (proteinCalories + fatCalories));
    const carbGrams = Math.round(carbCalories / caloriePerGramOfCarb);

    this.pieChartDatasets = [{
      data: [proteinGrams, fatGrams, carbGrams]
    }];
  }
}
