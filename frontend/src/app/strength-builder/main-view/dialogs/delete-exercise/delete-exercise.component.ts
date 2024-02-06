import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { handleSuccess } from 'src/app/common/functions/functions';
import { Exercise } from 'src/app/data/interfaces/exercises.model';
import { StrengthBuilderService } from 'src/app/data/services/strength-builder.service';

@Component({
  selector: 'app-delete-exercise',
  templateUrl: './delete-exercise.component.html',
  styleUrls: ['./delete-exercise.component.scss']
})
export class DeleteExerciseComponent {
  @Input() exercises!: Exercise[]

  constructor(private stbService: StrengthBuilderService, private toast: ToastrService, private modal: NgbModal, private translate: TranslateService) {
  }


  deleteExercise() {
    this.stbService.deleteExercises(this.exercises).subscribe({
      next: () => {
        handleSuccess('toastTitleDelete', this.modal, this.translate, this.toast);

      }
    })
  }

}
