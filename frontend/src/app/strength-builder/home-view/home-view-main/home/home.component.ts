import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private auth: AuthService, private spinner: NgxSpinnerService) {
  }

  signIn() {
    this.spinner.show()
    this.auth.signInWithGoogle().then(() => {
      this.spinner.hide()
    })
  }
}
