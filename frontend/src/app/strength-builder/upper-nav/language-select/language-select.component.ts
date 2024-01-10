import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent {
  currentLang: string;

  constructor(private translate: TranslateService, private spinner: NgxSpinnerService) {
    this.currentLang = translate.currentLang;
    translate.onLangChange.subscribe(langChangeEvent => {
      this.currentLang = langChangeEvent.lang;
    });
  }

  changeLanguage(lang: string) {
    if (this.currentLang !== lang) {
      this.spinner.show();

      this.translate.use(lang).subscribe(() => {
        console.log(lang)
        setTimeout(() => {
          this.spinner.hide();

        }, 500);
      });

    }
  }

}
