import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  constructor(
    private translateService: TranslateService,
    private translationService: TranslationService
  ) {
    this.translateService.addLangs(['fr', 'en']);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }


  switchLanguage(language: string) {
    this.translateService.use(language);
  }
}
