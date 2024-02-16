import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {



  constructor(private spinner: NgxSpinnerService) {
    // this.spinner.show();

    // // Ukryj spinner po 1 sekundzie (1000 ms)
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 1000);
  }




}


