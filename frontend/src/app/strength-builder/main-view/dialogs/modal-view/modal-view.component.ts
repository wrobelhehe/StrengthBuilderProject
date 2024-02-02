import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent {

  constructor(private modalService: NgbModal) { }
  @Input() headerTitle!: string

  close() {
    this.modalService.dismissAll()
  }
}
