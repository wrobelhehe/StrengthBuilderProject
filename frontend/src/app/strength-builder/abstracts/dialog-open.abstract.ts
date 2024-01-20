import { MatDialog } from '@angular/material/dialog';
import { BmiCalcComponent } from '../upper-nav/bmi-calc/bmi-calc.component';
import { CaloriesCalcComponent } from '../upper-nav/calories-calc/calories-calc.component';
import { DataComponent } from '../upper-nav/data/data.component';
import { FaqComponent } from '../upper-nav/faq/faq.component';
import { FfmiCalcComponent } from '../upper-nav/ffmi-calc/ffmi-calc.component';
import { CookiesComponent } from '../home-view/home-view-footer/cookies/cookies.component';
import { TermsComponent } from '../home-view/home-view-footer/terms/terms.component';
import { PrivacyComponent } from '../home-view/home-view-footer/privacy/privacy.component';


interface ComponentItem {
    icon: string;
    name: string;
    component: any; // Ideally, use a more specific type or generic if possible
}

export abstract class DialogOpen {
    constructor(private dialog: MatDialog) { }


    components: ComponentItem[] = [
        { icon: 'question_answer', name: 'faq', component: FaqComponent },
        { icon: 'sd_storage', name: 'data', component: DataComponent },
        { icon: 'fitness_center', name: 'caloriesCalculator', component: CaloriesCalcComponent },
        { icon: 'fitness_center', name: 'ffmiCalculator', component: FfmiCalcComponent },
        { icon: 'fitness_center', name: 'bmiCalculator', component: BmiCalcComponent }
    ];

    secondComponents: ComponentItem[] = [
        { icon: 'cookie_icon', name: 'cookies', component: CookiesComponent },
        { icon: 'gavel_icon', name: 'terms', component: TermsComponent },
        { icon: 'lock', name: 'privacyPolicy', component: PrivacyComponent },
    ];


    openDialog(component: any) {
        this.dialog.open(component, {
            width: "70vw",
            height: "70vh"
        })
    }

}
