import { Component } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard/dashboard.component";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [SidebarComponent, CommonModule, DashboardComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  selectedTab: string = 'dashboard'; // Default tab

  onTabSelected(tab: string) {
    this.selectedTab = tab;
  }
}
