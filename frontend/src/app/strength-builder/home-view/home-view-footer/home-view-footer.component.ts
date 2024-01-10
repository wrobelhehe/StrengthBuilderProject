import { Component } from '@angular/core';
import { DialogOpen } from '../../abstracts/dialog-open.abstract';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-view-footer',
  templateUrl: './home-view-footer.component.html',
  styleUrls: ['./home-view-footer.component.scss']
})
export class HomeViewFooterComponent extends DialogOpen {
  constructor(dialog: MatDialog) {
    super(dialog)
  }
}
