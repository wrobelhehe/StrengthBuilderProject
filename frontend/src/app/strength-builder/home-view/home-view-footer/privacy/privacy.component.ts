import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogClose } from 'src/app/strength-builder/abstracts/dialog-close.abstract';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent extends DialogClose {
  constructor(dialogRef: MatDialogRef<any>) {
    super(dialogRef)
  }
}
