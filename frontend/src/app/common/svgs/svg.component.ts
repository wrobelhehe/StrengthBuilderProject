import { Component, Input } from '@angular/core';


export type SvgCode = 'NO_DATA' | '404' | 'GYM_1' | 'GYM_2';


@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent {
  @Input() svg!: SvgCode



}
