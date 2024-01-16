import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data/services/auth.service';
import { navbarData } from './nav-data';
import { DialogOpen } from '../../abstracts/dialog-open.abstract';
import { MatDialog } from '@angular/material/dialog';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})

export class SideNavComponent extends DialogOpen {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowSizeAndToggleNav();
  }


  isOpen = true;

  isExpanded = false;

  menuItems = navbarData;

  mobileRes = false

  activeItem: any;



  constructor(dialog: MatDialog, private auth: AuthService) {
    super(dialog)

  }

  ngOnInit() {
    this.checkWindowSizeAndToggleNav();
  }

  checkWindowSizeAndToggleNav() {
    const width = window.innerWidth;
    if (width > 1024 && !this.isOpen) {
      this.mobileRes = false
      this.isOpen = true;
    } else if (width <= 1024 && this.isOpen) {
      this.mobileRes = true
      this.isOpen = false;
    }
  }

  closeNav() {
    this.mobileRes ? this.isOpen = false : this.isOpen = true
  }

  logOut() {
    this.auth.signOut()
  }
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  toggleButton(): void {
    this.isExpanded = !this.isExpanded;
  }

}
