import { Component } from '@angular/core';
import { PlanSection } from 'src/app/data/interfaces/plan-main-view.model';
import { MOCK_PLAN_SECTIONS } from 'src/app/data/mocks/plans-main-view.mock';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent {
  planSections: PlanSection[] = MOCK_PLAN_SECTIONS;

  panelOpenState = false;
}
