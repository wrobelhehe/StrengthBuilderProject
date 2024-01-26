import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

    addExercise(exercise: Exercise): Promise<void> {
        const exerciseId = this.firestore.createId();
        return this.firestore.collection('exercises').doc(exerciseId).set({
            ...exercise,
            exerciseId: exerciseId
        });
    }

}
