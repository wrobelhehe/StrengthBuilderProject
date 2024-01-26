import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StrengthBuilderService } from '../services/strength-builder.service';

@Injectable({
    providedIn: 'root'
})
export class ExercisesResolver implements Resolve<any> {
    constructor(private strengthService: StrengthBuilderService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.strengthService.getExercises();
    }
}


