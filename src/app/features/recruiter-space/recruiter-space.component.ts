import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { GenericService } from '../../core/services/generic.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from '../user-space/sidebar/sidebar.component';
import { ProfileManagementComponent } from "./profile-management/profile-management.component";
import { OffersComponent } from "./offers/offers.component";
import { CandidaturesComponent } from "./candidatures/candidatures.component";
import { PayingToolsComponent } from "../user-space/paying-tools/paying-tools.component";
import { EventsComponent } from "./events/events.component";
import { CandidatesComponent } from "./candidates/candidates.component";
import { RouterModule } from '@angular/router';
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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  constructor(
    private genericService: GenericService,
    private translate: TranslateService
  ){}
  ngOnInit() {
    this.languages = this.genericService.getLanguages();
  }

  onTabSelected(tab: string) {
    this.selectedTab = tab;
  }

  goToNotifications(){
    this.selectedTab = 'notifications'
  }

  switchLanguage(language: string) {
    this.translate.setDefaultLang(language);  
    this.translate.use(language);  
    this.currentLanguage = language;
    this.toggleLangSelector();
   }

   toggleLangSelector(){
    this.isLangDropdownOpened = !this.isLangDropdownOpened;
  }

}
