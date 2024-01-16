import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map, switchMap, from, of } from 'rxjs';

export const roleGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const auth = inject(AngularFireAuth);
    const router = inject(Router);

    return auth.authState.pipe(
        switchMap(user => {
            if (user) {
                return from(user.getIdTokenResult());
            } else {
                return of(null);
            }
        }),
        map(idTokenResult => {
            console.log(idTokenResult)
            if (idTokenResult && idTokenResult.claims && typeof idTokenResult.claims['role'] !== 'undefined') {

                const role = idTokenResult.claims['role'];
                if (role === 'admin') {
                    return true; // Admin ma dostęp do wszystkich ścieżek
                }
                if (role === 'user') {
                    const restrictedPaths = ['/exercises', '/categories', '/users'];
                    const isRestricted = restrictedPaths.some(path => state.url.includes(path));
                    if (!isRestricted) {
                        return true; // Użytkownik ma dostęp, jeśli ścieżka nie jest zabroniona
                    }
                }
            }
            return router.createUrlTree(['/strength-builder/main/error']); // Przekierowanie na stronę błędu dla innych przypadków
        })
    );
};
