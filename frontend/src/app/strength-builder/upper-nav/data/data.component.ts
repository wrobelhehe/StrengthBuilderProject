import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogClose } from '../../abstracts/dialog-close.abstract';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent extends DialogClose {

  constructor(dialogRef: MatDialogRef<any>) {
    super(dialogRef)
  }


}
