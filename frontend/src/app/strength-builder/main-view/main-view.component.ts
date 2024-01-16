import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/data/services/auth.service';
import { StrengthBuilderService, UserData } from 'src/app/data/services/strength-builder.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnDestroy {

  data: any[] = []



  private authSubscription: Subscription;

  constructor(private authService: AuthService, private dataService: StrengthBuilderService) {
    this.authSubscription = this.authService.checkRole().subscribe(role => {
      console.log(role)
    });





  }


  getResult() {
    const userData: UserData = {
      // Przykładowe dane użytkownika
      age: 18,
      bodyweightKg: 100,
      best3SquatKg: 250,
      best3BenchKg: 150,
      best3DeadliftKg: 220,
      sex: 'M',
      equipment: 'Raw',
      tested: 'Yes'
    };
    this.dataService.getUserWeakness(userData).subscribe(res => {
      console.log(res)
    })
  }


  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
