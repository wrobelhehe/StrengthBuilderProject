import { Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOpen } from '../../abstracts/dialog-open.abstract';
import { AuthService } from '../../../data/services/auth.service';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-view-nav',
  templateUrl: './home-view-nav.component.html',
  styleUrls: ['./home-view-nav.component.scss']
})
export class HomeViewNavComponent extends DialogOpen {

  isExpanded = false;
  constructor(modalService: NgbModal, private auth: AuthService, private offcanvasService: NgbOffcanvas) {
    super(modalService)
  }

  toggleButton(): void {
    this.isExpanded = !this.isExpanded;
  }

  closeModal() {
    this.isExpanded = false
    this.offcanvasService.dismiss()
  }

  signIn() {
    this.auth.signInWithGoogle()
  }

  openScroll(content: TemplateRef<any>) {
    this.toggleButton()
    this.isExpanded ? this.offcanvasService.open(content, { scroll: false, position: 'bottom', backdrop: false, keyboard: false }) : this.offcanvasService.dismiss()

  }
}
