import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { JobApplyComponent } from '../job-apply/job-apply.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faLocationPin, faDollarSign, faBookmark, faShareSquare } from '@fortawesome/free-solid-svg-icons'; // Import the icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Job } from '../../../../core/models/jobs.models';
import { JobService } from '../../../services/job.service';
@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent {
  @Input() layout: string = 'list';

  faLocationPin = faLocationPin;
  faDollarSign = faDollarSign;
  faBookmark = faBookmark;
  faShareSquare = faShareSquare;

  jobs: Job[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(private dialog: MatDialog, private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.loading = true;
    this.errorMessage = null;

    this.jobService.getAllJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load job listings. Please try again later.';
        console.error('Error fetching jobs:', err);
        this.loading = false;
      },
    });
  }

  openApplyDialog(jobId: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = { jobId };

    const dialogRef = this.dialog.open(JobApplyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Application submitted:', result);
      } else {
        console.log('Dialog closed without submission.');
      }
    });
  }
  

}
