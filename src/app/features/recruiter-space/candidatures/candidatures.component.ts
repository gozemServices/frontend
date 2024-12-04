import { Component, inject } from '@angular/core';
import { Candidature } from '../../../core/models/jobs.models';
import { AddOfferComponent } from '../offers/add-offer/add-offer.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faEllipsisH, faEdit, faComments, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';
@Component({
  selector: 'app-candidatures',
  standalone: true,
  imports: [CommonModule,FormsModule,FontAwesomeModule],
  templateUrl: './candidatures.component.html',
  styleUrl: './candidatures.component.scss'
})
export class CandidaturesComponent {
  candidatures: any;  // List of candidatures
  filteredCandidatures: any;
  idOffer: any;
  searchQuery: string = '';  // Search filter
  loading = false;
  statusFilter: 'pending' | 'interview' | 'hired' | 'rejected' | 'all' = 'all';  // Filter by status
  page: number = 1;
  itemsPerPage: number = 5;

  // Keep track of the currently active actions menu
  activeActions: number | null = null;  // ID of the candidature with open actions

  // Define the icons as properties
  faEllipsisH = faEllipsisH;
  faEdit = faEdit;
  faComments = faComments;
  faCheck = faCheck;
  faTimes = faTimes;


  private route = inject(ActivatedRoute);
  private jobService = inject(JobService);  
  constructor() {}

  ngOnInit(): void {
    const idOffer = this.route.snapshot.paramMap.get('id');
    this.idOffer = idOffer;
    this.fetchCandidates(idOffer);
  }

  fetchCandidates(id: any) {
    this.loading = true;
    this.jobService.getAllApplicationsByOffer(id).subscribe({
      next: (candidatures: any) => {
        this.candidatures = candidatures;
        this.loading = false;
        console.log(this.candidatures);
        this.applyFilters();
      },
      error: (err: any) => {
        console.error('Failed to fetch job details: ', err);
      }
    })
  }

  // Toggle the actions dropdown visibility for the specific candidature
  toggleActions(candidatureId: number): void {
    if (this.activeActions === candidatureId) {
      this.activeActions = null;  // Close dropdown if it's already open
    } else {
      this.activeActions = candidatureId;  // Open dropdown for this candidature
    }
  }
  closeActions() {
    
  }
  // Filter candidatures by search query and status
  applyFilters() {
    this.filteredCandidatures = this.candidatures
      .filter((c: any) =>
        (c.jobSeekerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        c.jobOfferTitle.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
        (this.statusFilter === 'all' || c.status === this.statusFilter)
      )
      .slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
  }

  // Update status of a candidature (e.g., 'pending' -> 'interview')
  updateStatus(candidature: Candidature, newStatus: 'pending' | 'interview' | 'hired' | 'rejected') {
    candidature.status = newStatus;
    this.applyFilters();
  }

  setPage(page: number) {
    this.page = page;
    this.applyFilters();
  }
}