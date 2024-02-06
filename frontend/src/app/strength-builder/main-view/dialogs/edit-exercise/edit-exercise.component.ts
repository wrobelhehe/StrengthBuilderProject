import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Exercise } from 'src/app/data/interfaces/exercises.model';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent {

  @Input() exercise!: Exercise

}
