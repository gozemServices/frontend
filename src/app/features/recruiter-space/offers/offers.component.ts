import { Component, Inject, OnInit } from '@angular/core';
import { JobOffer } from '../../../core/models/jobs.models';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JobService } from '../../services/job.service';
import {
  faDeleteLeft,
  faEdit,
  faEye,
  faToggleOff,
  faToggleOn,
} from '@fortawesome/free-solid-svg-icons';
import { AddOfferComponent } from './add-offer/add-offer.component';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, AddOfferComponent],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  faDelete = faDeleteLeft;
  faEdit = faEdit;
  faViewCandidates = faEye;
  fatoggleOn = faToggleOn;
  fatoggleOf = faToggleOff;

  isModalVisible = false;
  isLoading = true;  // New property to track the loading state
  selectedOffer!: JobOffer;
  jobOffers: JobOffer[] = [];
  filteredOffers: JobOffer[] = [];
  page: number = 1;
  itemsPerPage: number = 3;
  searchQuery: string = '';
  sortField: keyof JobOffer = 'title';
  sortOrder: string = 'asc';


  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchJobOffers();
  }

  fetchJobOffers() {
    this.isLoading = true; 
    this.jobService.getAllJobs().subscribe({
      next: (offers: JobOffer[]) => {
        this.jobOffers = offers;
        this.applyFilters();
        this.isLoading = false;  // Set loading state to false after data is fetched
      },
      error: (err: any) => {
        console.error('Failed to fetch job offers:', err);
        this.isLoading = false;  // Set loading state to false in case of an error
      },
    });
  }

  deleteOffer(id: number) {
    this.jobService.deleteJobOffer(id).subscribe({
      next: () => {
        this.jobOffers = this.jobOffers.filter((offer) => offer.id !== id);
        this.applyFilters();
      },
      error: (err: any) => console.error('Failed to delete job offer:', err),
    });
  }

  toggleOfferStatus(id: number) {
    const offer = this.jobOffers.find((o) => o.id === id);
    if (offer) {
      const updatedStatus = { active: !offer.active };
      this.jobService.updateJobOffer(id, updatedStatus).subscribe({
        next: (updatedOffer: JobOffer) => {
          offer.active = updatedOffer.active;
          this.applyFilters();
        },
        error: (err: any) => console.error('Failed to update job offer:', err),
      });
    }
  }

  applyFilters() {
    this.filteredOffers = this.jobOffers.filter((offer) =>
      offer.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.filteredOffers.sort((a, b) => {
      const compareA = a[this.sortField]?.toString().toLowerCase() ?? '';
      const compareB = b[this.sortField]?.toString().toLowerCase() ?? '';
      return this.sortOrder === 'asc'
        ? compareA.localeCompare(compareB)
        : compareB.localeCompare(compareA);
    });

    this.filteredOffers = this.filteredOffers.slice(
      (this.page - 1) * this.itemsPerPage,
      this.page * this.itemsPerPage
    );
  }

  setSortField(field: keyof JobOffer) {
    this.sortField = field;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  setPage(page: number) {
    this.page = page;
    this.applyFilters();
  }

  openAddOfferModal(offer?: JobOffer) {
    if (offer) this.selectedOffer = offer;
    this.isModalVisible = true;
  }

  onModalClosed() {
    this.isModalVisible = false;
  }

  onModalConfirmed() {
    // Placeholder for any modal confirmation actions
  }


  letsOpenModal() {
    
  }
}
