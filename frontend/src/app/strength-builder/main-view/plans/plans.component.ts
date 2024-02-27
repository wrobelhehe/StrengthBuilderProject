import { trigger, state, style, transition, animate } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { StrengthBuilderService } from 'src/app/data/services/strength-builder.service';
import { ModalViewComponent } from '../dialogs/modal-view/modal-view.component';
import { TrainingPlan } from 'src/app/data/interfaces/plan.model';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]


})
export class PlansComponent {

  plans: TrainingPlan[] = []

  constructor(private strengthBuilderService: StrengthBuilderService,
    private modalService: NgbModal, private toast: ToastrService, private translate: TranslateService, private breakpointObserver: BreakpointObserver) {
  }

  generatePlan() {
    const modalRef = this.modalService.open(ModalViewComponent, { fullscreen: true });
    modalRef.componentInstance.headerTitle = 'generate-plan'

  }
}
