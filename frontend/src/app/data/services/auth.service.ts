import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { GoogleAuthProvider } from "@angular/fire/auth"
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, catchError, filter, first, firstValueFrom, from, interval, map, of, switchMap, takeUntil, takeWhile, tap, throwError, timer } from "rxjs";
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private fireAuth: AngularFireAuth, private router: Router, private spinner: NgxSpinnerService) {

    }
    signInWithGoogle() {
        return this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then((userCredential) => {
            const checkRole$ = timer(0, 1000).pipe(
                tap(attempts => console.log(`Attempt ${attempts + 1}: Checking role...`)),
                switchMap(() => {
                    if (userCredential.user) {
                        return from(userCredential.user.getIdTokenResult(true));
                    } else {
                        return throwError(() => new Error('User is null'));
                    }
                }),
                first(idTokenResult => idTokenResult && idTokenResult.claims['role'], null),
                takeUntil(timer(10000)),
                catchError(err => {
                    console.error('Error during role checking:', err);
                    return throwError(() => err);
                })
            );

            checkRole$.subscribe({
                next: (idTokenResult) => {
                    console.log(`Role found: ${idTokenResult?.claims['role']}`);
                    this.router.navigate(['/strength-builder/main']);
                },
                complete: () => console.log('Completed checking role'),
                error: (err) => console.error('Error during role checking:', err)
            });
        }, err => {
            console.log('Error during sign in:', err);
        });
    }




    signOut() {
        this.spinner.show()
        return this.fireAuth.signOut().then(() => {
            this.router.navigate(['/strength-builder/home']);
            this.spinner.hide()

        }, err => {
            console.log(err)
        })
    }

    checkRole(): Observable<string> {
        return this.fireAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return from(user.getIdTokenResult(true));
                } else {
                    return of(null);
                }
            }),
            map(idTokenResult => {
                if (idTokenResult && idTokenResult.claims && typeof idTokenResult.claims['role'] !== 'undefined') {
                    return idTokenResult.claims['role'];
                } else {
                    return null;
                }
            })
        );
    }

}