import { Component } from '@angular/core';
import { createEmptyTrainingPlan } from 'src/app/common/builders/plan-builder.model';
import { TrainingPlan } from 'src/app/data/interfaces/plan.model';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss']
})
export class CreatePlanComponent {
  plan!: TrainingPlan

  constructor() {
    this.plan = createEmptyTrainingPlan()
  }
}
