import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogClose } from 'src/app/strength-builder/abstracts/dialog-close.abstract';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent extends DialogClose {
  constructor(modalService: NgbModal) {
    super(modalService)
  }
}
