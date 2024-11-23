import { Component, Inject, OnInit } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PayingToolsComponent } from "./paying-tools/paying-tools.component";
import { CvBuilderComponent } from "./cv-builder/cv-builder.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JobsComponent } from "./jobs/jobs.component";
import { GenericService } from '../../core/services/generic.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProfileComponent } from "./profile/profile.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { JobseekerMessagesComponent } from "./jobseeker-messages/jobseeker-messages.component";
import { RouterModule } from '@angular/router';
import { User } from '../../core/models/common.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule, 
    FontAwesomeModule, 
    SidebarComponent, 
    CommonModule, 
    ],
  templateUrl: './user-space.component.html',
  styleUrl: './user-space.component.scss'
})
export class UserSpaceComponent implements OnInit{
  // private genericService = Inject(GenericService);
  selectedTab: string = 'dashboard'; 
  currentLanguage = 'en';
  userType = 'jobseeker'
  languages !: string[];
  isLangDropdownOpened = false;
  faChevronDown = faChevronDown;
  faNotificationRing = faBell;
  user!: User | null;
  profilePic: string | ArrayBuffer | null = null;

  constructor(
    private genericService: GenericService,
    private translate: TranslateService,
    private authService: AuthService
  ){}
  ngOnInit() {
    this.languages = this.genericService.getLanguages();
    this.user = this.authService.getUser();
    this.loadProfileImage(this.user?.profilePhotoUrl ?? '');
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



  loadProfileImage(fileName: string) {
    this.genericService.getImageRessource(fileName).subscribe(
      (data) => {
        // Convert the Blob to a URL and display it
        this.profilePic = URL.createObjectURL(data);
      },
      (error) => {
        console.error('Error fetching image', error);
        this.profilePic = null
      }
    );
  }
}
