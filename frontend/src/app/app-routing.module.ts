import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'strength-builder', pathMatch: 'full' },
  { path: 'strength-builder', loadChildren: () => import('../app/strength-builder/strength-builder.module').then(m => m.StrengthBuilderModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
