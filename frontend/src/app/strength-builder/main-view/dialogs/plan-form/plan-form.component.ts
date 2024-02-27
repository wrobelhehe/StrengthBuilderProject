import { Component, Input } from '@angular/core';
import { TrainingPlan } from 'src/app/data/interfaces/plan.model';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent {

  @Input() plan!: TrainingPlan

}
