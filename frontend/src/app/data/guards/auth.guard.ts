import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';



export const authMainGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const auth = inject(AngularFireAuth);
    const router = inject(Router);

    return auth.authState.pipe(
        map(user => user ? true : router.createUrlTree(['/strength-builder/home']))
    );
};



export const authHomeGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const auth = inject(AngularFireAuth);
    const router = inject(Router);
    return auth.authState.pipe(
        map((user) => {
            return user ? router.createUrlTree(['/strength-builder/main']) : true;
        })
    );
};