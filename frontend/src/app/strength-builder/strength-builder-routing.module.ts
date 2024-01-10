import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authHomeGuard, authMainGuard } from '../data/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('../strength-builder/home-view/home-view.module').then(m => m.HomeViewModule), canActivate: [authHomeGuard] },
  { path: 'main', loadChildren: () => import('../strength-builder/main-view/main-view.module').then(m => m.MainViewModule), canActivate: [authMainGuard] },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StrengthBuilderRoutingModule { }
