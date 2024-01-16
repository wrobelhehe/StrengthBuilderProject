import { MatDialog } from '@angular/material/dialog';
import { BmiCalcComponent } from '../upper-nav/bmi-calc/bmi-calc.component';
import { CaloriesCalcComponent } from '../upper-nav/calories-calc/calories-calc.component';
import { DataComponent } from '../upper-nav/data/data.component';
import { FaqComponent } from '../upper-nav/faq/faq.component';
import { FfmiCalcComponent } from '../upper-nav/ffmi-calc/ffmi-calc.component';
import { CookiesComponent } from '../home-view/home-view-footer/cookies/cookies.component';
import { TermsComponent } from '../home-view/home-view-footer/terms/terms.component';
import { PrivacyComponent } from '../home-view/home-view-footer/privacy/privacy.component';

export abstract class DialogOpen {
    constructor(private dialog: MatDialog) { }


    components: any = [
        { icon: 'question_answer', name: 'faq', component: FaqComponent },
        { icon: 'sd_storage', name: 'data', component: DataComponent },
        { icon: 'fitness_center', name: 'caloriesCalculator', component: CaloriesCalcComponent },
        { icon: 'fitness_center', name: 'ffmiCalculator', component: FfmiCalcComponent },
        { icon: 'fitness_center', name: 'bmiCalculator', component: BmiCalcComponent }
    ];

    secondComponents: any = [
        { name: 'cookies', component: CookiesComponent },
        { name: 'terms', component: TermsComponent },
        { name: 'privacyPolicy', component: PrivacyComponent },

    ];

    openDialog(component: any) {
        this.dialog.open(component, {
            width: "70vw",
            height: "70vh"
        })
    }

}
