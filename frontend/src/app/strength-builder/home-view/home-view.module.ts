import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewRoutingModule } from './home-view-routing.module';
import { HomeViewNavComponent } from './home-view-nav/home-view-nav.component';
import { HomeViewMainComponent } from './home-view-main/home-view-main.component';
import { HomeViewFooterComponent } from './home-view-footer/home-view-footer.component';
import { HomeViewComponent } from './home-view.component';
import { MaterialModule } from '../../material/material.module';
import { HomeViewMidArrowComponent } from './home-view-mid-arrow/home-view-mid-arrow.component';
import { AboutComponent } from './home-view-main/about/about.component';
import { PlansComponent } from './home-view-main/plans/plans.component';
import { HomeComponent } from './home-view-main/home/home.component';
import { ContactComponent } from './home-view-main/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    HomeViewComponent,
    HomeViewNavComponent,
    HomeViewMainComponent,
    HomeViewFooterComponent,
    HomeViewMidArrowComponent,
    AboutComponent,
    PlansComponent,
    HomeComponent,
    ContactComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeViewRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      extend: true
    }),
  ]
})
export class HomeViewModule { }
