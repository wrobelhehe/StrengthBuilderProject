import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exercise } from 'src/app/data/interfaces/exercises.model';


import { StrengthBuilderService } from 'src/app/data/services/strength-builder.service';
import { ModalViewComponent } from '../dialogs/modal-view/modal-view.component';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  exercises: Exercise[] = []

  constructor(private strengthBuilderService: StrengthBuilderService, private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.strengthBuilderService.getExercises().subscribe(data => {
      this.exercises = data;
      console.log(this.exercises)
    });
  }

  openFullscreen() {
    this.modalService.open(ModalViewComponent, { fullscreen: true });
  }


  addExercise() {
    const newExercise: Exercise = {
      description: "dip_description",
      type: [''],
      category: ["bench"],
      name: "dip_bench_press_name",
      movementPlane: "sagittal",
      moevementType: "push",
      videoUrl: "https://www.youtube.com/watch?v=TbMpGOtB95Q",
      coeff: 0.5,
      bodyPart: ["chest", "triceps"],
      exp: 'intermediate'
    };

    this.strengthBuilderService.addExercise(newExercise).then(() => {
      console.log('Exercise added successfully!');
    }).catch(error => {
      console.error('Error adding exercise: ', error);
    });
  }

}
