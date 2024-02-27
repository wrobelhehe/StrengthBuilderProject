import { Component, Input } from '@angular/core';
import { TrainingPlan } from 'src/app/data/interfaces/plan.model';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent {
  @Input() plan!: TrainingPlan


}
