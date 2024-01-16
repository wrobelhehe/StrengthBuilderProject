import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './main-view.component';
import { PlansComponent } from './plans/plans.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { HomeComponent } from './home/home.component';
import { roleGuard } from 'src/app/data/guards/role.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '', component: MainViewComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [roleGuard]
      },
      {
        path: 'plans',
        component: PlansComponent,
        canActivate: [roleGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [roleGuard]
      },
      {
        path: 'analysis',
        component: AnalysisComponent,
        canActivate: [roleGuard]
      },
      {
        path: 'exercises',
        component: ExercisesComponent,
        canActivate: [roleGuard]
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [roleGuard]
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [roleGuard]
      },
      {
        path: 'error',
        component: ErrorComponent,
        canActivate: [roleGuard]
      },
      { path: '**', component: ErrorComponent }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainViewRoutingModule { }
