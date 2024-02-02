import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exercise } from 'src/app/data/interfaces/exercises.model';


import { StrengthBuilderService } from 'src/app/data/services/strength-builder.service';
import { ModalViewComponent } from '../dialogs/modal-view/modal-view.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  exercises: Exercise[] = []

  constructor(private strengthBuilderService: StrengthBuilderService, private modalService: NgbModal, private toast: ToastrService, private translate: TranslateService) {

  }
  ngOnInit(): void {
    this.strengthBuilderService.getExercises().subscribe(data => {
      this.exercises = data;
      console.log(this.exercises)
    });
  }

  openFullscreen() {
    const modalRef = this.modalService.open(ModalViewComponent, { fullscreen: true });
    modalRef.componentInstance.headerTitle = 'add-exercise'
  }

}
