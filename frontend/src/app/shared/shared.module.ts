import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectComponent } from '../strength-builder/upper-nav/language-select/language-select.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FadeInOnScrollDirective } from '../common/directives/fade-in.directive';
import { ScrollToDirective } from '../common/directives/scroll-to.directive';
import { ScrollProgressDirective } from '../common/directives/scroll-progress';
import { UpperNavComponent } from '../strength-builder/upper-nav/upper-nav.component';
import { BottomFooterComponent } from '../strength-builder/bottom-footer/bottom-footer.component';
import { CookiesComponent } from '../strength-builder/home-view/home-view-footer/cookies/cookies.component';
import { PrivacyComponent } from '../strength-builder/home-view/home-view-footer/privacy/privacy.component';
import { TermsComponent } from '../strength-builder/home-view/home-view-footer/terms/terms.component';
import { BmiCalcComponent } from '../strength-builder/upper-nav/bmi-calc/bmi-calc.component';
import { CaloriesCalcComponent } from '../strength-builder/upper-nav/calories-calc/calories-calc.component';
import { DataComponent } from '../strength-builder/upper-nav/data/data.component';
import { FaqComponent } from '../strength-builder/upper-nav/faq/faq.component';
import { FfmiCalcComponent } from '../strength-builder/upper-nav/ffmi-calc/ffmi-calc.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LanguageSelectComponent,
    ScrollToDirective,
    FadeInOnScrollDirective,
    ScrollProgressDirective,
    UpperNavComponent,
    BottomFooterComponent,
    CookiesComponent,
    TermsComponent,
    PrivacyComponent,
    FaqComponent,
    DataComponent,
    CaloriesCalcComponent,
    FfmiCalcComponent,
    BmiCalcComponent,


  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    NgChartsModule,
    ReactiveFormsModule,
    FormsModule,


  ],
  exports: [
    LanguageSelectComponent,
    ScrollProgressDirective, ScrollToDirective, FadeInOnScrollDirective, UpperNavComponent, BottomFooterComponent, CookiesComponent,
    TermsComponent,
    PrivacyComponent,
    FaqComponent,
    DataComponent,
    CaloriesCalcComponent,
    FfmiCalcComponent,
    BmiCalcComponent,
    TranslateModule
  ]

})
export class SharedModule { }
