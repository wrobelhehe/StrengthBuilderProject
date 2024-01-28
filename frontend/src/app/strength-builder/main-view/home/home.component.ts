import { Component } from '@angular/core';
import { TUTORIALS_1, TUTORIALS_2 } from 'src/app/data/mocks/tutorials.mocks';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  userName!: string

  tutorials1 = TUTORIALS_1
  tutorials2 = TUTORIALS_2

  constructor(private auth: AuthService) {
    this.auth.getUserData().subscribe(user => {
      if (user) {
        this.userName = user.multiFactor.user.displayName;
      }
    });

  }
}
