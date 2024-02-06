import { Component } from "@angular/core";
import { createExercise } from "src/app/common/builders/exercise.model";
import { Exercise } from "src/app/data/interfaces/exercises.model";

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
})
export class AddExerciseComponent {
  exercise!: Exercise
  constructor() {
    this.exercise = createExercise()
  }
}