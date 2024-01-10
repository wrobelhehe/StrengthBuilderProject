// scroll.directive.ts
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appScrollTo]'
})
export class ScrollToDirective {
    @Input('appScrollTo') appScrollTo!: string;

    @HostListener('click', ['$event'])
    onClick(event: any) {
        event.preventDefault();
        const element = document.querySelector(this.appScrollTo);
        element?.scrollIntoView({ behavior: 'smooth' });
    }
}
