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
    type: [[], Validators.required],
    name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
    bodyPart: [[], Validators.required],
    category: [[], Validators.required],
  });

  secondExerciseFormGroup = this.fb.group({
    coeff: [0.5, [Validators.required, Validators.min(0)]],
    movementPlane: ['', Validators.required],
    movementType: ['', Validators.required],
    videoUrl: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    exp: ['', Validators.required]
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
      // Dodaj nowy zestaw po określonym indeksie
      this.setsFormArray.insert(index + 1, newSet);
    } else {
      // Jeśli indeks nie jest podany, dodaj na końcu
      this.setsFormArray.push(newSet);
    }
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

}
