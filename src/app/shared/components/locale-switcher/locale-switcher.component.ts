
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-locale-switcher',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './locale-switcher.component.html',
  styles: `select {
    @apply text-lg;
  }
  
  select:focus {
    @apply ring-2 ring-blue-500;
  }
  
  `
})
export class LocaleSwitcherComponent {
  currentLang: string;

  private translate = inject(TranslateService);
  constructor(){
    this.currentLang = this.translate.currentLang;
    // this.translate.setDefaultLang(this.currentLang);
  }
  switchLanguage(language: string) {
    if (this.currentLang !== language) {
      this.translate.use(language);
      this.currentLang = language;
    }
  }

}
