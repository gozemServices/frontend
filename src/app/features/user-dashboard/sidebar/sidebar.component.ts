import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'; 
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartArea, faChartBar, faFileInvoiceDollar, faGauge, faMessage, faSearch, faUser, faVcard } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,TranslateModule, MatTabsModule,FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Output() tabSelected = new EventEmitter<string>();
  selectedTab: string = 'dashboard';
  isSidebarOpened = false;
  //icons 

  faDashboard = faGauge;
  faUser = faUser;
  faSearch = faSearch;
  faMessage = faMessage;
  faVcard = faVcard;
  faStats = faChartBar;
  faPayingTools= faFileInvoiceDollar;
  userTabs = [
    { id: 'dashboard', label: 'DASHBOARD_LABEL', icon: this.faDashboard, title: 'DASHBOARD_TITLE' },
  { id: 'profile', label: 'PROFILE_LABEL', icon: this.faUser, title: 'PROFILE_TITLE' },
  { id: 'jobs', label: 'JOBS_LABEL', icon: this.faSearch, title: 'JOBS_TITLE' },
  { id: 'messages', label: 'MESSAGES_LABEL', icon: this.faMessage, title: 'MESSAGES_TITLE' },
  { id: 'cvs', label: 'CVS_LABEL', icon: this.faVcard, title: 'CVS_TITLE' },
  { id: 'stats', label: 'STATS_LABEL', icon: this.faStats, title: 'STATS_TITLE' },
  { id: 'paying_tools', label: 'PAYING_TOOLS_LABEL', icon: this.faPayingTools, title: 'PAYING_TOOLS_TITLE' },
    // { id: 'point_management', label: 'Gestion des points', icon: 'fa-solid fa-grip', title: 'point_management' }
  ];

  selectTab(tab: string) {
    this.selectedTab =  tab;
    this.tabSelected.emit(tab);
    this.isSidebarOpened = !this.isSidebarOpened;
  }

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

}
