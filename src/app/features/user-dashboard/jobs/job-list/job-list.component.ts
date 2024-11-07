import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { JobApplyComponent } from '../job-apply/job-apply.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faLocationPin, faDollarSign, faBookmark, faShareSquare } from '@fortawesome/free-solid-svg-icons'; // Import the icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent {
  constructor(private dialog: MatDialog){}
  @Input() layout: String = 'list';

  faLocationPin = faLocationPin;
  faDollarSign = faDollarSign;
  faBookmark = faBookmark;
  faShareSquare = faShareSquare;
  
  jobs = [
    { 
      title: 'Web Designer', 
      location: 'Yaounde', 
      type: 'permanent',
      salary: '50-30k', 
      posted: '1 hour ago',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius iste labore molestiae quos dolor excepturi dolore pariatur, veritatis rem. Commodi, minus quaerat! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius iste labore molestiae quos dolor excepturi dolore pariatur, veritatis rem. Commodi, minus quaerat!' },
    { 
      title: 'Web Designer', 
      location: 'permanent', 
      type: 'freelance',
      salary: '50-30k', 
      posted: '1 hour ago',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius iste labore molestiae quos dolor excepturi dolore pariatur, veritatis rem. Commodi, minus quaerat!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius iste labore molestiae quos dolor excepturi dolore pariatur, veritatis rem. Commodi, minus quaerat!'   },
    { 
      title: 'Web Designer', 
      location: 'Yaounde', 
      type: 'freelance',
      salary: '50-30k', 
      posted: '1 hour ago',
      description: '        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius iste labore molestiae quos dolor excepturi dolore pariatur, veritatis rem. Commodi, minus quaerat! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius iste labore molestiae quos dolor excepturi dolore pariatur, veritatis rem. Commodi, minus quaerat!' 
    },
  ];


  openApplyDialog(): void {
    const dialogRef = this.dialog.open(JobApplyComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Application submitted', result);
      } else {
        console.log('Dialog closed without submission');
      }
    });
  }


  openApplyDialog2(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';  
    dialogConfig.panelClass = 'custom-dialog';
  
    const dialogRef = this.dialog.open(JobApplyComponent,{
      data: {
        jobId: 'false',
      },
      }
    );
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Application submitted', result);
      } else {
        console.log('Dialog closed without submission');
      }
    });
  }
  

}
