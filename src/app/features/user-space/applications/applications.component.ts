import { Component, inject } from '@angular/core';
import { JobService } from '../../services/job.service';
import { faEllipsisV, faTrash, faEye, faUpload, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [FontAwesomeModule,DatePipe,FormsModule,CommonModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent {
  applications: any[] = [];
  filteredApplications: any[] = [];
  searchQuery = '';
  isLoading = false;
  page = 1;
  itemsPerPage = 10;
  faEllipsisV = faEllipsisV;
  faTrash = faTrash;
  faEye = faEye;
  faUpload = faUpload;
  faDownload = faDownload;

  private jobService = inject(JobService);
  constructor() {}

 
  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.isLoading = true;
    this.jobService.getAllApplicationsByJobSeeker().subscribe({
      next: (data) => {
        this.applications = data;
        this.filteredApplications = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching applications:', error);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredApplications = this.applications.filter((application) =>
      application.jobOfferTitle.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  viewDetails(applicationId: number): void {
    console.log(`Viewing details for application ID: ${applicationId}`);
  }

  deleteApplication(applicationId: number): void {
    console.log(`Deleting application ID: ${applicationId}`);
  }

  uploadDocument(applicationId: number): void {
    console.log(`Uploading document for application ID: ${applicationId}`);
  }

  downloadDocument(applicationId: number): void {
    console.log(`Downloading document for application ID: ${applicationId}`);
  }

  setPage(newPage: number): void {
    if (newPage > 0) {
      this.page = newPage;
    }
  }

  refreshApplications(): void {
    this.loadApplications();
  }
}
