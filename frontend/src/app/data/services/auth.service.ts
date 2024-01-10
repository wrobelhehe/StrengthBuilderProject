import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { GoogleAuthProvider } from "@angular/fire/auth"
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs";

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
}