import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faChartBar, faFileAlt, faFileInvoiceDollar, faGauge, faMessage, faSearch, faUser, faUserTie, faVcard } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { faTachometerAlt, faBriefcase, faClipboardList, faDollarSign, faCalendarAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,TranslateModule, MatTabsModule,FontAwesomeModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  // authService =Inject(AuthService);
  @Output() tabSelected = new EventEmitter<string>();
  @Input() userType =  'jobseeker'
  @Input() userInfos: any;
  selectedTab: string = 'dashboard';
  isSidebarOpened = false;
  menuItems: any;
  //icons 

  faDashboard = faGauge;
  faUser = faUser;
  faSearch = faSearch;
  faMessage = faMessage;
  faVcard = faVcard;
  faStats = faChartBar;
  faPayingTools= faFileInvoiceDollar;
  faCvtheque = faFileAlt;
  faProposal = faUserTie;
  faBriefcase = faBriefcase;

  userTabs = [
  { id: 'dashboard', link: 'dashboard', label: 'DASHBOARD_LABEL', icon: this.faDashboard, title: 'DASHBOARD_LABEL' },
  { id: 'proposals', link: 'proposals', label: 'PROPOSALS_LABEL', icon: this.faProposal, title: 'PROPOSALS_LABEL' },
  { id: 'jobs', link: 'jobs', label: 'JOBS_LABEL', icon: this.faSearch, title: 'JOBS_LABEL' },
  { id: 'applications', link: 'applications', label: 'APPLICATIONS_LABEL', icon: this.faBriefcase, title: 'APPLICATIONS_LABEL' },
  { id: 'messages', link: 'messages', label: 'MESSAGES_LABEL', icon: this.faMessage, title: 'MESSAGES_LABEL' },
  { id: 'cvs', link: 'cv-builder', label: 'CVS_LABEL', icon: this.faVcard, title: 'CVS_LABEL' },
  { id: 'stats', link: 'statistics', label: 'STATS_LABEL', icon: this.faStats, title: 'STATS_LABEL' },
  { id: 'paying_tools', link: 'paying-tools', label: 'PAYING_TOOLS_LABEL', icon: this.faPayingTools, title: 'PAYING_TOOLS_LABEL' },
  { id: 'profile', link: 'profile', label: 'PROFILE_LABEL', icon: this.faUser, title: 'PROFILE_LABEL' },
  // { id: 'point_management', label: 'Gestion des points', icon: 'fa-solid fa-grip', title: 'point_management' }
  ];
  
  recruitersTab = [
    { id: 'dashboard', link: 'dashboard', label: 'DASHBOARD_LABEL', icon: faTachometerAlt, title: 'DASHBOARD_TITLE' },
    { id: 'cvtheque', link: 'dashboard', label: 'CVTHEQUE_LABEL', icon: this.faCvtheque, title: 'CVTHEQUE_TITLE' },
    { id: 'profile', link: 'profile', label: 'PROFILE_LABEL', icon: faUser, title: 'PROFILE_TITLE' },
    { id: 'offers', link: 'offers', label: 'OFFERS_LABEL', icon: this.faBriefcase, title: 'OFFERS_TITLE' },
    // { id: 'candidatures', link: 'candidatures', label: 'CANDIDATURES_LABEL', icon: faClipboardList, title: 'CANDIDATURES_TITLE' },
    { id: 'paying_tools', link: 'paying-tools', label: 'PAYING_TOOLS_LABEL', icon: faDollarSign, title: 'PAYING_TOOLS_TITLE' },
    { id: 'events', link: 'events', label: 'EVENT_LABEL', icon: faCalendarAlt, title: 'EVENTS_TITLE' },
    { id: 'candidates', link: 'candidates', label: 'CANDIDATES_LABEL', icon: faUsers, title: 'CANDIDATES_TITLE' }
  ];



  selectTab(link: string) {
    this.selectedTab =  link;
    this.tabSelected.emit(link);
    this.isSidebarOpened = !this.isSidebarOpened;
  }

  toggleSidebar() {
    // alert('yo')
    this.isSidebarOpened = !this.isSidebarOpened;
    // alert(this.isSidebarOpened);
  }

  ngOnInit(){

    this.userInfos = {
      
    }
    if(this.userType == 'recruiter'){
      this.menuItems = this.recruitersTab;

    }else{
      this.menuItems = this.userTabs;
    }
    // console.log(this.userInfos);
  }
  constructor(private authService: AuthService) {
    
  }

  onLogout() {
    this.authService.logout();
  }

}
