import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Validators, FormArray, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Exercise } from 'src/app/data/interfaces/exercises.model';
import { BODY_PARTS, MOVEMENT_PLANES, TYPES, CATEGORIES, MOVEMENT_TYPES, EXPERIENCE } from 'src/app/data/mocks/plans-mocks';
import { StrengthBuilderService } from 'src/app/data/services/strength-builder.service';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {
  bodyParts = BODY_PARTS

  movementPlanes = MOVEMENT_PLANES

  types = TYPES

  categories = CATEGORIES

  movementTypes = MOVEMENT_TYPES

  experience = EXPERIENCE

  exerciseFormGroup = this.fb.group({
    type: [[], Validators.required],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
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

  constructor(private fb: FormBuilder, private sbService: StrengthBuilderService, private toast: ToastrService, private modal: NgbModal, private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.addSet(0);

  }


  addSet(index: number) {
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
      sets: this.setsFormArray.value,
      type: this.exerciseFormGroup.value.type || [],
      bodyPart: this.exerciseFormGroup.value.bodyPart || [],
      category: this.exerciseFormGroup.value.category || [],
    };
    if (this.exerciseFormGroup.valid && this.secondExerciseFormGroup.valid && this.exerciseSetForm.valid) {
      console.log(combinedFormData)
      this.sbService.addExercise(combinedFormData as Exercise).then(() => {
        this.modal.dismissAll()
        this.translate.get('toastTitle').subscribe((translation: string) => {
          this.toast.success('', translation, {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-bottom-right'
          });
        });
        console.log('Form Data:', combinedFormData);
      })

    }


  }


  drop(event: CdkDragDrop<any[]>) {
    const formArray = this.setsFormArray;
    moveItemInArray(formArray.controls, event.previousIndex, event.currentIndex);
    formArray.updateValueAndValidity();
  }

}
