import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'; 

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Output() tabSelected = new EventEmitter<string>();
  selectedTab: string = 'dashboard';
  isSidebarOpened = false;

  selectTab(tab: string) {
    this.selectedTab =  tab;
    this.tabSelected.emit(tab);
  }

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

}
