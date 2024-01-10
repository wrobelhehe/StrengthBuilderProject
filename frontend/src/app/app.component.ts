import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.initializeAppLanguage();
  }

  initializeAppLanguage() {
    const userLang = navigator.language;
    const defaultLang = userLang.includes('pl') ? 'pl' : 'en';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
  }
}
