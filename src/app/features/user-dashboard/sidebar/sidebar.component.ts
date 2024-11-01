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

  selectTab(tab: string) {
    this.tabSelected.emit(tab);
  }

}
