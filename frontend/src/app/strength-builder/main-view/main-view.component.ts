import { Component } from '@angular/core';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
  constructor(private auth: AuthService) {


  }
  logOut() {
    this.auth.signOut()
  }
}
