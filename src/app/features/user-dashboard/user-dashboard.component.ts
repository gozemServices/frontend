import { Component } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PayingToolsComponent } from "./paying-tools/paying-tools.component";
import { CvBuilderComponent } from "./cv-builder/cv-builder.component";
import { StatisticsComponent } from "./statistics/statistics.component";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [SidebarComponent, CommonModule, DashboardComponent, PayingToolsComponent, CvBuilderComponent, StatisticsComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  selectedTab: string = 'dashboard'; // Default tab

  onTabSelected(tab: string) {
    this.selectedTab = tab;
  }
}
