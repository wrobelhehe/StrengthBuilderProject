import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOpen } from '../abstracts/dialog-open.abstract';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-upper-nav',
  templateUrl: './upper-nav.component.html',
  styleUrls: ['./upper-nav.component.scss']
})
export class UpperNavComponent extends DialogOpen {

  @Input() logged = false

  constructor(dialog: MatDialog, private auth: AuthService) {
    super(dialog)
  }

  logOut() {
    this.auth.signOut()
  }
}
