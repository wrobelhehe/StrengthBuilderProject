import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ExerciseSet } from 'src/app/data/interfaces/exercises.model';
import { BODY_PARTS, CATEGORIES, EXPERIENCE, MOVEMENT_PLANES, MOVEMENT_TYPES, TYPES } from 'src/app/data/mocks/plans-mocks';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})
export class AddExerciseComponent implements OnInit {

  sets: ExerciseSet[] = []

  bodyParts = BODY_PARTS

  movementPlanes = MOVEMENT_PLANES

  types = TYPES

  categories = CATEGORIES

  movementTypes = MOVEMENT_TYPES

  experience = EXPERIENCE

  panelOpenState = false;


  exerciseFormGroup = this.fb.group({
    type: [['wa'], Validators.required],
    name: ["f212121", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ["'wa'", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
    bodyPart: [['wa'], Validators.required],
    category: [['wa'], Validators.required],
  });

  secondExerciseFormGroup = this.fb.group({
    coeff: [0.5, [Validators.required, Validators.min(0)]],
    movementPlane: ['wa', Validators.required],
    movementType: ['wa', Validators.required],
    videoUrl: ['wa21212121212121', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    exp: ['wa', Validators.required]
  });
  exerciseSetForm = this.fb.group({
    sets: this.fb.array([])
  });

  get setsFormArray() {
    return this.exerciseSetForm.get('sets') as FormArray;
  }

  constructor(private fb: FormBuilder) {
    console.log(this.types)
  }

  ngOnInit(): void {
    this.addSet(0)
  }

  addSet(index: number) {
    console.log(index)
    const newSet = this.fb.group({
      reps: [null, [Validators.required, Validators.min(1), Validators.max(50)]],
      rpe: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      weight: [null, [Validators.min(1), Validators.max(600)]],
      tempo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
    if (!index) {
      this.setsFormArray.insert(index + 1, newSet);
    } else {
      this.setsFormArray.push(newSet);
    }
  }

  copySet(index: number) {
    const currentSetValues = this.setsFormArray.at(index).value;

    const copiedSet = this.fb.group({
      reps: [currentSetValues.reps, [Validators.required, Validators.min(1), Validators.max(50)]],
      rpe: [currentSetValues.rpe, [Validators.required, Validators.min(1), Validators.max(10)]],
      weight: [currentSetValues.weight, [Validators.min(1), Validators.max(600)]],
      tempo: [currentSetValues.tempo, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });

    this.setsFormArray.insert(index + 1, copiedSet);
  }

  removeSet(index: number) {
    this.setsFormArray.removeAt(index);
  }

  saveExercise() {
    const combinedFormData = {
      ...this.exerciseFormGroup.value,
      ...this.secondExerciseFormGroup.value,
      sets: this.sets
    };

    console.log('Form Data:', combinedFormData);
  }


  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.setsFormArray.controls, event.previousIndex, event.currentIndex);
  }

}
