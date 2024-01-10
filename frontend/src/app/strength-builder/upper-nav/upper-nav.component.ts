import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOpen } from '../abstracts/dialog-open.abstract';

@Component({
  selector: 'app-upper-nav',
  templateUrl: './upper-nav.component.html',
  styleUrls: ['./upper-nav.component.scss']
})
export class UpperNavComponent extends DialogOpen {

  constructor(dialog: MatDialog) {
    super(dialog)
  }
}
