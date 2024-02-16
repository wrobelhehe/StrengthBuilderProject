import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormArray, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { handleSuccess } from 'src/app/common/functions/functions';
import { nonEmptyArrayValidator } from 'src/app/common/validators/validators';
import { Exercise } from 'src/app/data/interfaces/exercises.model';
import { BODY_PARTS, MOVEMENT_PLANES, TYPES, CATEGORIES, MOVEMENT_TYPES, EXPERIENCE } from 'src/app/data/mocks/plans-mocks';
import { StrengthBuilderService } from 'src/app/data/services/strength-builder.service';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {

  @Input() exercise!: Exercise

  exerciseId?: string

  bodyParts = BODY_PARTS

  movementPlanes = MOVEMENT_PLANES

  types = TYPES

  categories = CATEGORIES

  movementTypes = MOVEMENT_TYPES

  experience = EXPERIENCE

  exerciseFormGroup = this.fb.group({
    type: [[''], [Validators.required, nonEmptyArrayValidator()]],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],
    bodyPart: [[''], [Validators.required, nonEmptyArrayValidator()]],
    category: [[''], [Validators.required, nonEmptyArrayValidator()]],
    isCompetitionLift: [false]
  });


  secondExerciseFormGroup = this.fb.group({
    coeff: [0.5, [Validators.required, Validators.min(0)]],
    movementPlane: ['', Validators.required],
    movementType: ['', Validators.required],
    videoUrl: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    exp: [[''], [Validators.required, nonEmptyArrayValidator()]]
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
    this.exerciseId = this.exercise?.exerciseId;
    this.initForms()
  }

  initForms(): void {
    this.exerciseFormGroup.patchValue({
      type: this.exercise?.type,
      name: this.exercise?.name,
      description: this.exercise?.description,
      bodyPart: this.exercise?.bodyPart,
      category: this.exercise?.category,
      isCompetitionLift: this.exercise?.isCompetitionLift
    });

    this.secondExerciseFormGroup.patchValue({
      coeff: this.exercise?.coeff,
      movementPlane: this.exercise?.movementPlane,
      movementType: this.exercise?.movementType,
      videoUrl: this.exercise?.videoUrl,
      exp: this.exercise?.exp,
    });


    // while (this.setsFormArray.length !== 0) {
    //   this.setsFormArray.removeAt(0);
    // }

    // if (this.exercise && this.exercise.sets && this.exercise.sets.length > 0) {
    //   this.exercise.sets.forEach(set => {
    //     const setGroup = this.fb.group({
    //       reps: [set.reps, [Validators.required, Validators.min(1), Validators.max(50)]],
    //       rpe: [set.rpe, [Validators.required, Validators.min(1), Validators.max(10)]],
    //       weight: [set.weight, [Validators.min(0), Validators.max(600)]],
    //       tempo: [set.tempo, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    //     });
    //     this.setsFormArray.push(setGroup);
    //   });
    // }
  }



  // addSet(index: number) {
  //   const newSet = this.fb.group({
  //     reps: [null, [Validators.required, Validators.min(1), Validators.max(50)]],
  //     rpe: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
  //     weight: [null, [Validators.min(0), Validators.max(600)]],
  //     tempo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
  //   });
  //   if (!index) {
  //     this.setsFormArray.insert(index + 1, newSet);
  //   } else {
  //     this.setsFormArray.push(newSet);
  //   }
  // }

  // copySet(index: number) {
  //   const currentSetValues = this.setsFormArray.at(index).value;

  //   const copiedSet = this.fb.group({
  //     reps: [currentSetValues.reps, [Validators.required, Validators.min(1), Validators.max(50)]],
  //     rpe: [currentSetValues.rpe, [Validators.required, Validators.min(1), Validators.max(10)]],
  //     weight: [currentSetValues.weight, [Validators.min(0), Validators.max(600)]],
  //     tempo: [currentSetValues.tempo, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
  //   });

  //   this.setsFormArray.insert(index + 1, copiedSet);
  // }

  // removeSet(index: number) {
  //   this.setsFormArray.removeAt(index);
  // }

  saveExercise() {

    if (this.exerciseFormGroup.valid && this.secondExerciseFormGroup.valid && this.exerciseSetForm.valid) {

      const combinedFormData = {
        ...this.exerciseFormGroup.value,
        ...this.secondExerciseFormGroup.value,
        // sets: this.setsFormArray.value,
        type: this.exerciseFormGroup.value.type || [],
        bodyPart: this.exerciseFormGroup.value.bodyPart || [],
        category: this.exerciseFormGroup.value.category || [],
        ...(this.exerciseId ? { exerciseId: this.exerciseId } : {})
      };
      console.log(combinedFormData)
      console.log(this.exerciseId)
      if (!this.exerciseId) {
        this.sbService.addExercise(combinedFormData as Exercise).subscribe({
          next: () => {
            handleSuccess('toastTitleAdd', this.modal, this.translate, this.toast);
            console.log('Form Data:', combinedFormData);
          },
          error: (error) => console.error('Error adding exercise:', error)
        });
      } else {
        this.sbService.editExercise(combinedFormData as Exercise).subscribe({
          next: () => {
            handleSuccess('toastTitleEdit', this.modal, this.translate, this.toast);
            console.log('Form Data:', combinedFormData);
          },
          error: (error) => console.error('Error editing exercise:', error)
        });
      }

    }


  }

  // private handleSuccess(translationKey: string): void {
  //   this.modal.dismissAll();
  //   this.translate.get(translationKey).subscribe({
  //     next: (translation: string) => {
  //       this.toast.success('', translation, {
  //         closeButton: true,
  //         progressBar: true,
  //         positionClass: 'toast-bottom-right'
  //       });
  //     },
  //     error: (error) => console.error('Error translating message:', error)
  //   });
  // }


  drop(event: CdkDragDrop<any[]>) {
    const formArray = this.setsFormArray;
    moveItemInArray(formArray.controls, event.previousIndex, event.currentIndex);
    formArray.updateValueAndValidity();
  }

}
