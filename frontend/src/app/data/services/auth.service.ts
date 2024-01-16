import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { GoogleAuthProvider } from "@angular/fire/auth"
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, from, map, of, switchMap } from "rxjs";
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private fireAuth: AngularFireAuth, private router: Router, private spinner: NgxSpinnerService) {

    }
    signInWithGoogle() {
        return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then((user) => {
            this.router.navigate(['/strength-builder/main']);
        }, err => {
            console.log(err)
        })
    }

    signOut() {
        return this.fireAuth.signOut().then(() => {
            this.router.navigate(['/strength-builder/home']);
        }, err => {
            console.log(err)
        })
    }

    checkRole(): Observable<string> {
        return this.fireAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return from(user.getIdTokenResult());
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