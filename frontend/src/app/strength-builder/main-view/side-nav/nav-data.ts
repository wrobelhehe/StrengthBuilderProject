import { CookiesComponent } from "../../home-view/home-view-footer/cookies/cookies.component";
import { PrivacyComponent } from "../../home-view/home-view-footer/privacy/privacy.component";
import { TermsComponent } from "../../home-view/home-view-footer/terms/terms.component";
import { BmiCalcComponent } from "../../upper-nav/bmi-calc/bmi-calc.component";
import { CaloriesCalcComponent } from "../../upper-nav/calories-calc/calories-calc.component";
import { DataComponent } from "../../upper-nav/data/data.component";
import { FaqComponent } from "../../upper-nav/faq/faq.component";
import { FfmiCalcComponent } from "../../upper-nav/ffmi-calc/ffmi-calc.component";

export interface navBar {
    routeLink: string;
    label: string;
    icon: string;
    role: string[];
}

export interface ComponentItem {
    icon: string;
    name: string;
    component: any;
}

export const firstComponents: ComponentItem[] = [
    { icon: 'question_answer', name: 'faq', component: FaqComponent },
    { icon: 'sd_storage', name: 'data', component: DataComponent },
    { icon: 'fitness_center', name: 'caloriesCalculator', component: CaloriesCalcComponent },
    { icon: 'fitness_center', name: 'ffmiCalculator', component: FfmiCalcComponent },
    { icon: 'fitness_center', name: 'bmiCalculator', component: BmiCalcComponent }
]
export const secondComponents: ComponentItem[] = [
    { icon: 'cookie_icon', name: 'cookies', component: CookiesComponent },
    { icon: 'gavel_icon', name: 'terms', component: TermsComponent },
    { icon: 'lock', name: 'privacyPolicy', component: PrivacyComponent },
]
export const thirdComponents: ComponentItem[] = [
    { icon: 'home', name: 'home', component: '/' },
    { icon: 'contact_support', name: 'about', component: '#about' },
    { icon: 'assignment', name: 'plans', component: '#plans' },
    { icon: 'contact_mail', name: 'contact', component: "#contact" },
]


export const navbarData: navBar[] = [
    {
        routeLink: '/strength-builder/main/home',
        icon: 'home',
        label: 'home',
        role: ['user', 'admin'],

    },
    {
        routeLink: '/strength-builder/main/dashboard',
        icon: 'dashboard',
        label: 'dashboard',
        role: ['user', 'admin'],

    },
    {
        routeLink: '/strength-builder/main/plans',
        icon: 'assignment',
        label: 'plans',
        role: ['user', 'admin'],
    },

    {
        routeLink: '/strength-builder/main/analysis',
        icon: 'timeline',
        label: 'analysis',
        role: ['user', 'admin'],

    },
    {
        routeLink: '/strength-builder/main/exercises',
        icon: 'fitness_center',
        label: 'exercises',
        role: ['admin'],

    },
    {
        routeLink: '/strength-builder/main/categories',
        icon: 'category',
        label: 'categories',
        role: ['admin'],

    },
    {
        routeLink: '/strength-builder/main/users',
        icon: 'supervised_user_circle',
        label: 'users',
        role: ['admin'],

    },
];