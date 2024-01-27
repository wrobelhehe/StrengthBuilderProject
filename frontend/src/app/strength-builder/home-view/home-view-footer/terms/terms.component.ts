import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogClose } from 'src/app/strength-builder/abstracts/dialog-close.abstract';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent extends DialogClose {
  constructor(modalService: NgbModal) {
    super(modalService)
  }

}
