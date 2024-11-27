import { Component, inject, OnInit } from '@angular/core';
import { JobOffer } from '../../../core/models/jobs.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JobService } from '../../services/job.service';
import {faDeleteLeft,faEdit,faEye,faToggleOff,faToggleOn,} 
from '@fortawesome/free-solid-svg-icons';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { AskDeleteConfirmationComponent } from '../../../shared/components/toasts/ask-delete-confirmation/ask-delete-confirmation.component';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
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
  isLoading = true;
  jobOffers: JobOffer[] = [];
  filteredOffers: JobOffer[] = [];

  page: number = 1;
  itemsPerPage: number = 3;
  searchQuery: string = '';
  sortField: keyof JobOffer = 'title';
  sortOrder: string = 'asc';

  private jobService = inject(JobService);
  private modalService = inject(ModalService);


  constructor() {}

  ngOnInit(): void {this.fetchJobOffers();}

  fetchJobOffers() {
    this.isLoading = true; 
    this.jobService.getAllJobs().subscribe({
      next: (offers: JobOffer[]) => {
        this.jobOffers = offers;
        this.applyFilters();
        this.isLoading = false; 
      },
      error: (err: any) => {
        console.error('Failed to fetch job offers:', err);
        this.isLoading = false;  
      },
    });
  }

  deleteOffer(offer: JobOffer) {
    const offerId = offer.id;
    this.modalService.open(AskDeleteConfirmationComponent, {
      size: {
        width: '100%',
        padding: '1rem'
      },
      data: {
        itemToDelete: offer.title,
        type: 'OFFER'
      }
    }).then((data) => {
        const deletionConfirmed = data;
        if(deletionConfirmed) {
          this.jobService.deleteJobOffer(offerId).subscribe({
            next: () => console.log('job offer deleted with success '),
            error: (err) => console.error('there was and error : ', err),
          })
        }
        
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

  // openAddOfferModal(offer?: JobOffer) {
  //   if (offer) this.selectedOffer = offer;
  //   this.isModalVisible = true;
  // }

  onModalClosed() {
    this.isModalVisible = false;
  }

  onModalConfirmed() {
    // Placeholder for any modal confirmation actions
  }


  letsOpenModal() {
    
  }

  iseverythingclose: any;

  openAddOfferModal(offer?: JobOffer) {
    // alert("opened");
    this.modalService.open(AddOfferComponent, {
      size: {
        width: '80%',
        padding: '1rem'
      },
      data: {
        selectedOffer: offer,
        isEditMode: offer ? true : false,
      }
    }).then((data) => {
      this.iseverythingclose = data;
      alert(this.iseverythingclose);
      });
  }

}
