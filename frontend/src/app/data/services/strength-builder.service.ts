import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, map } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Exercise } from '../interfaces/exercises.model';

export interface UserData {
    age: number;
    bodyweightKg: number;
    best3SquatKg: number;
    best3BenchKg: number;
    best3DeadliftKg: number;
    sex: string;
    equipment: string;
    tested: string;
}

@Injectable({
    providedIn: 'root'
})
export class StrengthBuilderService {
    constructor(private firestore: AngularFirestore, private fns: AngularFireFunctions) { }

    public getUserWeakness(userData: UserData): Observable<any> {
        // Wywołanie Cloud Function
        const callable = this.fns.httpsCallable('calculateWeakestLift');
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
