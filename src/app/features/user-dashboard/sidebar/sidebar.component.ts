import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'; 
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartArea, faChartBar, faFileInvoiceDollar, faGauge, faMessage, faSearch, faUser, faVcard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatTabsModule,FontAwesomeModule],
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
    { id: 'dashboard', label: 'Dashboard', icon: this.faDashboard, title: 'dashboard' },
    { id: 'profile', label: 'Profile', icon: this.faUser, title: 'profile' },
    { id: 'jobs', label: 'Jobs', icon: this.faSearch, title: 'jobs' },
    { id: 'dashboard', label: 'Messages', icon: this.faMessage, title: 'messages' },
    { id: 'cvs', label: 'Gestion des cvs', icon: this.faVcard, title: 'cvs' },
    { id: 'stats', label: 'Suivis et stats', icon: this.faStats, title: 'stats' },
    { id: 'paying_tools', label: 'Outils payants', icon: this.faPayingTools, title: 'paying_tools' },
    // { id: 'point_management', label: 'Gestion des points', icon: 'fa-solid fa-grip', title: 'point_management' }
  ];

  selectTab(tab: string) {
    this.selectedTab =  tab;
    this.tabSelected.emit(tab);
  }

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

}
