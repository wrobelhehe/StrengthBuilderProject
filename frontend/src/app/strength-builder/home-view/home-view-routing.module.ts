import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './home-view.component';
import { HomeViewMainComponent } from './home-view-main/home-view-main.component';


const routes: Routes = [
  {
    path: '', component: HomeViewComponent,
    children: [
      {
        path: '',
        component: HomeViewMainComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeViewRoutingModule { }
