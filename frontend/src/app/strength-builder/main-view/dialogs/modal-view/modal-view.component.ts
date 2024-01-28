import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent {
  @Input() type!: string
  @Input() headerTitle!: string


}
