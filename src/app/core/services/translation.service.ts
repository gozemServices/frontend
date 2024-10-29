import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  defaultLang = 'fr';
  constructor(private translateService: TranslateService) { }

  changeLang(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('lang', lang);
  }
}
