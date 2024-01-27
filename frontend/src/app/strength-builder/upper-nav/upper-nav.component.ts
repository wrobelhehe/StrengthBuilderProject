import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOpen } from '../abstracts/dialog-open.abstract';
import { AuthService } from 'src/app/data/services/auth.service';
import { SideNavToggleService } from 'src/app/data/services/side-nav-toggle.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upper-nav',
  templateUrl: './upper-nav.component.html',
  styleUrls: ['./upper-nav.component.scss']
})
export class UpperNavComponent extends DialogOpen implements OnDestroy {

  @Input() logged = false

  @Input() mobileRes = false

  private subscription!: Subscription;


  isOpen = false

  constructor(modalService: NgbModal, private auth: AuthService, private sideNavService: SideNavToggleService) {
    super(modalService)
    this.subscription = this.sideNavService.buttonState$.subscribe((val) => {
      this.isOpen = val
    });
  }

  logOut() {
    this.auth.signOut()
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.sideNavService.changeButtonState(this.isOpen)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
