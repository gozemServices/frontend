import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { faBell, faCalendar, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GenericService } from '../../core/services/generic.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { User } from '../../core/models/common.model';
import { AuthService } from '../auth/auth.service';
import { LocaleSwitcherComponent } from "../../shared/components/locale-switcher/locale-switcher.component";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    FontAwesomeModule,
    SidebarComponent,
    CommonModule,
    LocaleSwitcherComponent
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
  faCalendar = faCalendar;
  user!: User | null;
  userInfos: any;
  profilePic: string | ArrayBuffer | null = null;
  currentDate = new Date();

  private genericService= inject(GenericService);
  private authService= inject(AuthService);
  constructor(){}
  ngOnInit() {
    this.user = this.authService.getUser();
    this.loadProfileImage(this.user?.profilePhotoUrl ?? '');
  }

  onTabSelected(tab: string) {
    this.selectedTab = tab;
  }

  goToNotifications(){
    this.selectedTab = 'notifications'
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
        console.log(this.userInfos);
      },
      (error) => {
        console.error('Error fetching image', error);
        this.profilePic = null
      }
    );
  }
}
