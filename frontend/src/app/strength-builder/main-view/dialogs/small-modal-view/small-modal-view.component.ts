import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-small-modal-view',
  templateUrl: './small-modal-view.component.html',
  styleUrls: ['./small-modal-view.component.scss']
})
export class SmallModalViewComponent {
  @Input() headerTitle!: string

  @Input() data!: any

  constructor(private modalService: NgbModal) {

  }

  close() {
    this.modalService.dismissAll()
  }
}
