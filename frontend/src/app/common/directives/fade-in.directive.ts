import { Directive, ElementRef, Renderer2, Input, HostListener, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[appFadeInOnScroll]'
})
export class FadeInOnScrollDirective implements AfterViewInit {
    @Input() appFadeInOnScroll: 'left' | 'right' | 'up' | 'down' = 'up';
    @Input() delay: number = 0; // Nowy input do określenia opóźnienia w sekundach
    @Input() once: boolean = false;
    private hasAnimated = false;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.renderer.addClass(this.el.nativeElement, 'invisible');
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.checkIfElementInView();
        }, this.delay * 100);
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.checkIfElementInView();
    }

    private checkIfElementInView() {
        if (this.once && this.hasAnimated) {
            return;
        }

        const elementPosition = this.el.nativeElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementInView = elementPosition.bottom > 0 && elementPosition.top <= viewportHeight;

        if (elementInView) {
            this.renderer.removeClass(this.el.nativeElement, 'invisible');
            this.renderer.addClass(this.el.nativeElement, 'in-viewport-' + this.appFadeInOnScroll);
            if (this.once) {
                this.hasAnimated = true;
            }
        } else if (!this.once) {
            this.renderer.addClass(this.el.nativeElement, 'invisible');
            this.renderer.removeClass(this.el.nativeElement, 'in-viewport-' + this.appFadeInOnScroll);
        }
    }
}
