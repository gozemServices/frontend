import { Component } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PayingToolsComponent } from "./paying-tools/paying-tools.component";
import { CvBuilderComponent } from "./cv-builder/cv-builder.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JobsComponent } from "./jobs/jobs.component";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [FontAwesomeModule, SidebarComponent, CommonModule, DashboardComponent, PayingToolsComponent, CvBuilderComponent, StatisticsComponent, JobsComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  selectedTab: string = 'jobs'; // Default tab

  faChevronDown = faChevronDown;
  faNotificationRing = faBell;

  onTabSelected(tab: string) {
    this.selectedTab = tab;
  }
}
