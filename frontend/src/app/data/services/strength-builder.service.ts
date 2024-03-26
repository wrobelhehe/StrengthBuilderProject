import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, map } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Exercise } from '../interfaces/exercises.model';
import { TrainingPlan } from '../interfaces/plan.model';

export interface UserData {
    age: number;
    bodyWeight: number;
    squat: number;
    bench: number;
    deadlift: number;
    sex: string;
    tested: boolean;
    experience: string;
}

@Injectable({
    providedIn: 'root'
})
export class StrengthBuilderService {
    constructor(private firestore: AngularFirestore, private fns: AngularFireFunctions) { }

    public generateTrainingExercises(userData: any): Observable<any> {
        // Wywołanie Cloud Function
        const callable = this.fns.httpsCallable('generateTrainingExercises');
        return callable
            (userData);
    }

    public getExercises(): Observable<Exercise[]> {
        return this.firestore.collection('exercises').valueChanges().pipe(
            map((data: any[]) => {
                return data.map(item => ({ ...item } as Exercise));
            })
        );
    }

    addPlan(plan: TrainingPlan): Observable<void> {
        const planId = this.firestore.createId();
        return from(this.firestore.collection('plans').doc(planId).set({
            ...plan,
            planId: planId
        }));
    }

    addExercise(exercise: Exercise): Observable<void> {
        const exerciseId = this.firestore.createId();
        return from(this.firestore.collection('exercises').doc(exerciseId).set({
            ...exercise,
            exerciseId: exerciseId
        }));
    }

    editExercise(exercise: Exercise): Observable<void> {

        return from(this.firestore.collection('exercises').doc(exercise.exerciseId).update({
            ...exercise
        }));
    }

    deleteExercises(exercises: Exercise[]): Observable<any> {
        const deleteObservables = exercises.map(exercise => {
            if (!exercise.exerciseId) {
                throw new Error('Exercise missing exerciseId');
            }
            return from(this.firestore.collection('exercises').doc(exercise.exerciseId).delete());
        });

        return forkJoin(deleteObservables);
    }


}
