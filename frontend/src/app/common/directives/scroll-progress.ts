

import { Directive, ElementRef, Renderer2, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[appScrollProgress]'
})
export class ScrollProgressDirective {
    @Input() appScrollProgress!: number;
    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.renderer.listen(this.el.nativeElement, 'transitionend', (event: TransitionEvent) => {
            if (event.propertyName === 'width' && this.appScrollProgress >= 100) {
                this.renderer.addClass(this.el.nativeElement, 'progress-pulse-animation');
            }
        });
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(): void {
        const elementPosition = this.el.nativeElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementInView = elementPosition.bottom > 0 && elementPosition.top <= viewportHeight;

        if (elementInView) {
            this.renderer.setStyle(this.el.nativeElement, 'width', `${this.appScrollProgress}%`);
            if (this.appScrollProgress >= 100) {
                this.renderer.setStyle(this.el.nativeElement, 'transition', 'width 2s ease-out');

            }
        } else {
            this.renderer.setStyle(this.el.nativeElement, 'width', '0%');
            this.renderer.setStyle(this.el.nativeElement, 'transition', 'width 2s ease-out');
            this.renderer.removeClass(this.el.nativeElement, 'progress-pulse-animation');
        }
    }
}




