import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data/services/auth.service';
import { navbarData } from './nav-data';
import { DialogOpen } from '../../abstracts/dialog-open.abstract';
import { MatDialog } from '@angular/material/dialog';
import { SideNavToggleService } from 'src/app/data/services/side-nav-toggle.service';
import { Subscription } from 'rxjs';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})

export class SideNavComponent extends DialogOpen implements OnInit, OnDestroy {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowSizeAndToggleNav();
  }

  private subscription!: Subscription;


  currentUserRole!: string;

  isOpen = true;

  menuItems = navbarData;

  mobileRes = false

  activeItem: any;


  constructor(dialog: MatDialog, private auth: AuthService, private sideNavService: SideNavToggleService) {
    super(dialog)
    this.subscription = this.sideNavService.buttonState$.subscribe((val) => {
      this.isOpen = val
    });
  }

  ngOnInit() {
    this.auth.checkRole().subscribe(role => {
      this.currentUserRole = role;
    });
    this.checkWindowSizeAndToggleNav();

  }

  checkWindowSizeAndToggleNav() {
    const width = window.innerWidth;
    this.mobileRes = width <= 1024;
    this.isOpen = !this.mobileRes;
    this.sideNavService.changeButtonState(this.isOpen);

  }

  hasRole(requiredRoles: string[]): boolean {
    return requiredRoles.includes(this.currentUserRole);
  }

  closeNav() {
    this.mobileRes ? this.isOpen = false : this.isOpen = true;
    this.sideNavService.changeButtonState(this.isOpen)

  }

  logOut() {
    this.auth.signOut()
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
