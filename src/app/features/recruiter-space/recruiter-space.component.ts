import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { GenericService } from '../../core/services/generic.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from '../user-space/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { User } from '../../core/models/common.model';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-recruiter-space',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    SidebarComponent,
    TranslateModule,
    FontAwesomeModule,
    RouterModule
],
  templateUrl: './recruiter-space.component.html',
  styleUrl: './recruiter-space.component.scss'
})
export class RecruiterSpaceComponent {
  title = 'Recruiteur Dashboard';
  selectedTab: string = 'dashboard'; 
  
  currentLanguage = 'en';
  isSidebarOpen = false; 
  languages !: string[];
  isLangDropdownOpened = false;
  faChevronDown = faChevronDown;
  faNotificationRing = faBell;

  userType = 'recruiter'
  user!: User | null;

  private genericService = inject(GenericService);
  private authService = inject(AuthService);
  private translateService = inject(TranslateService);
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  constructor(){}
  ngOnInit() {
    this.languages = this.genericService.getLanguages();
    this.user = this.authService.getUser();
    console.log(this.user);
  }

  onTabSelected(tab: string) {
    this.selectedTab = tab;
  }

  goToNotifications(){
    this.selectedTab = 'notifications'
  }

  switchLanguage(language: string) {
    this.translateService.setDefaultLang(language);  
    this.translateService.use(language);  
    this.currentLanguage = language;
    this.toggleLangSelector();
   }

   toggleLangSelector(){
    this.isLangDropdownOpened = !this.isLangDropdownOpened;
  }

}
