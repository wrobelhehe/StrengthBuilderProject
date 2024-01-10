import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrengthBuilderComponent } from './strength-builder.component';
import { StrengthBuilderRoutingModule } from './strength-builder-routing.module';
import { MainViewComponent } from './main-view/main-view.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    StrengthBuilderComponent,
    MainViewComponent,

  ],
  imports: [
    CommonModule,
    StrengthBuilderRoutingModule,
    MaterialModule,
    SharedModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule

  ]
})
export class StrengthBuilderModule { }
