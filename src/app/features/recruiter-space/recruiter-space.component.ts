import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faBell, faCalendar, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { GenericService } from '../../core/services/generic.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from '../user-space/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { User } from '../../core/models/common.model';
import { AuthService } from '../auth/auth.service';
import { LocaleSwitcherComponent } from "../../shared/components/locale-switcher/locale-switcher.component";
@Component({
  selector: 'app-recruiter-space',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    SidebarComponent,
    TranslateModule,
    FontAwesomeModule,
    RouterModule,
    LocaleSwitcherComponent
],
  templateUrl: './recruiter-space.component.html',
  styleUrl: './recruiter-space.component.scss'
})
export class RecruiterSpaceComponent {
  title = 'Recruiteur Dashboard';
  selectedTab: string = 'dashboard'; 
  profilePic: string | ArrayBuffer | null = null;

  currentLanguage = 'en';
  isSidebarOpen = false; 
  languages !: string[];
  isLangDropdownOpened = false;
  faChevronDown = faChevronDown;
  faNotificationRing = faBell;
  faCalendar = faCalendar;
  userType = 'recruiter'
  user!: User | null;
  userInfos: any;
  currentDate = new Date();
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
    this.loadProfileImage(this.user?.profilePhotoUrl ?? '');
    this.currentDate  = new Date();
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

  loadProfileImage(fileName: string) {
    this.genericService.getImageRessource(fileName).subscribe(
      (data) => {
        // Convert the Blob to a URL and display it
        this.profilePic = URL.createObjectURL(data);
        this.userInfos = {
          ...this.user,
          profilePic: this.profilePic
        }
        // console.log(this.userInfos);
      },
      (error) => {
        console.error('Error fetching image', error);
        this.profilePic = null
      }
    );
  }

}
