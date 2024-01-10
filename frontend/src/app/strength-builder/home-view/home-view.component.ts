import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.3s ease-out',
              style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('0.3s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class HomeViewComponent {

  scrolled = false;


  @HostListener('window:scroll')
  onWindowScroll() {
    const numb = window.scrollY;
    if (numb >= 160) {

      this.scrolled = true;

    }
    else {
      this.scrolled = false;

    }
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
