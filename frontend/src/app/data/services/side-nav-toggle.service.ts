import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SideNavToggleService {
    private buttonStateSource = new BehaviorSubject<boolean>(false);
    buttonState$ = this.buttonStateSource.asObservable();

    changeButtonState(newState: boolean) {
        this.buttonStateSource.next(newState);
    }
}
