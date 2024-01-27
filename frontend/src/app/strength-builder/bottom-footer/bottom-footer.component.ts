import { Component } from '@angular/core';
import { DialogOpen } from '../abstracts/dialog-open.abstract';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bottom-footer',
  templateUrl: './bottom-footer.component.html',
  styleUrls: ['./bottom-footer.component.scss']
})
export class BottomFooterComponent extends DialogOpen {
  constructor(modalService: NgbModal) {
    super(modalService)
  }
}
