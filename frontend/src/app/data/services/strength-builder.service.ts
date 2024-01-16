import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

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
    constructor(private db: AngularFireDatabase, private fns: AngularFireFunctions) { }

    public getData(): Observable<any[]> {

        // console.log(this.db.list('data').valueChanges())
        return this.db.list('data').valueChanges();
    }

    public getUserWeakness(userData: UserData): Observable<any> {
        // Wywołanie Cloud Function
        const callable = this.fns.httpsCallable('calculateWeakestLift');
        return callable
            (userData);
    }




}
