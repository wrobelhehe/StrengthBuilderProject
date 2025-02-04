import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent {
  @Input() headerTitle!: string

  @Input() data!: any

  constructor(private modalService: NgbModal) {

  }

  close() {
    this.modalService.dismissAll()
  }
}
