import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { JobApplyComponent } from '../job-apply/job-apply.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faLocationPin, faDollarSign, faBookmark, faShareSquare } from '@fortawesome/free-solid-svg-icons'; // Import the icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Job } from '../../../../core/models/jobs.models';
import { JobService } from '../../../services/job.service';
import {Router } from '@angular/router';
import { ShareItemComponent } from "../../../../shared/component/share-job/share-item.component";
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { environment } from '../../../../../environments/environment';
import { ModalService } from '../../../../shared/components/modal/modal.service';
@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ShareItemComponent, TimeAgoPipe],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent {
  JOB_URL = `${environment.appURL}/user/job/details`;
  @Input() layout: string = 'list';

  faLocationPin = faLocationPin;
  faDollarSign = faDollarSign;
  faBookmark = faBookmark;
  faShareSquare = faShareSquare;

  jobs: Job[] = [];
  loading = false;
  errorMessage: string | null = null;
  private router = inject(Router);
  private jobService = inject(JobService);
  private modalService = inject(ModalService);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.loading = true;
    this.errorMessage = null;
    this.jobService.getAllJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        console.log(this.jobs)
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load job listings. Please try again later.';
        console.error('Error fetching jobs:', err);
        this.loading = false;
      },
    });
  }

  openApplyDialog(jobId: number): void {
     // alert("opened");
     this.modalService.open(JobApplyComponent, {
      size: {
        width: '80%',
        padding: '1rem'
      },
      data: {
        selectedOffer: jobId,
      }
    }).then((data) => {

      });
  }

  goToJobDetails(job: any) {
    const jobId = job ? job?.id : null;
    this.router.navigate(['/user/job/details/',jobId]);
  }
  

}
