import { Component } from '@angular/core';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private auth: AuthService) {
  }

  signIn() {
    this.auth.signInWithGoogle()
  }
}
