
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark, faFile, faFileAlt, faFileLines, faHeart, faList, faListAlt, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { JobListComponent } from "./job-list/job-list.component";

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [FontAwesomeModule, JobListComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent {

  faBrowseAll = faFileLines;
   // Layout state, 'list' for list view, 'grid' for grid view
   layout: 'list' | 'grid' = 'grid';
   
   faFileAlt= faFileAlt; 
   faHeart= faHeart;
   faBookMark= faBookmark;
   faList = faList;
   faGrid = faThLarge;

 
   // Function to toggle layout
   setLayout(layout: 'list' | 'grid') {
     this.layout = layout;
   }
}
