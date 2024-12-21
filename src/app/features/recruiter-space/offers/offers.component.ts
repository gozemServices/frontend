import { Component, HostListener, inject, OnInit } from '@angular/core';
import { JobOffer } from '../../../core/models/jobs.models';

import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JobService } from '../../services/job.service';
import {faCalendarAlt, faCalendarCheck, faClipboardList, faClock, faDeleteLeft,faEdit,faEllipsisH,faEye,faToggleOff,faToggleOn,} 
from '@fortawesome/free-solid-svg-icons';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { AskDeleteConfirmationComponent } from '../../../shared/components/toasts/ask-delete-confirmation/ask-delete-confirmation.component';
import { Router, RouterModule } from '@angular/router';
import { Toast } from '../../../core/models/common.model';
import { GenericService } from '../../../core/services/generic.service';
import { PlanInterviewComponent } from '../interviews/plan-interview/plan-interview.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, RouterModule,CommonModule],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  faDelete = faDeleteLeft;
  faEdit = faEdit;
  faViewCandidates = faEye;
  fatoggleOn = faToggleOn;
  fatoggleOf = faToggleOff;
  faClipboardList = faClipboardList;
  faCalendarAlt  = faCalendarAlt;
  faClock = faClock;
  faEllipsisH = faEllipsisH;
  faCalendarCheck = faCalendarCheck;

  
  // isModalVisible = false;
  isLoading = true;
  jobOffers: JobOffer[] = [];
  filteredOffers: JobOffer[] = [];

  page: number = 1;
  itemsPerPage: number = 8;
  searchQuery: string = '';
  sortField: keyof JobOffer = 'title';
  sortOrder: string = 'asc';

  private jobService = inject(JobService);
  private modalService = inject(ModalService);
  private router = inject(Router);
  private genericsService = inject(GenericService);
  constructor() {}

  ngOnInit(): void {this.fetchJobOffers();}

  fetchJobOffers() {
    this.isLoading = true; 
    this.jobService.getAllRecruiterOffers().subscribe({
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
            next: () => {
              this.fetchJobOffers()
              const toastInfos : Toast =  {
                id: 0,
                message: 'job offer deleted with success',
                type: 'success',
                timeout: 2000
              }
              this.genericsService.openToast(toastInfos);
            },
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
    }).then((isDone) => {
        this.fetchJobOffers();       
    });
  }


  goToJobDetails(job: any) {
    const jobId = job ? job?.id : null;
    // console.log(job);
    this.router.navigate(['/user/job/details/',jobId]);
  }
  goToInterviewedList(job: any) {
      const jobId = job ? job?.id : null;
      this.router.navigate(['interviewed',jobId]);
  }

  openActionId!: any;

  toggleActions(id: any) {
    this.openActionId = this.openActionId === id ? null : id;
  }

  @HostListener('document:click', ['$event'])
  closeModal(event: MouseEvent): void {
    const modalElement = document.querySelector('#options-block');  
    // if(this.openActionId == null && )
    if (this.openActionId && modalElement && !modalElement.contains(event.target as Node)) {
      this.openActionId = null;
      // alert('clicked outside ')
    }
  }


  planInterviews(offerId: any) {
    const data = {
      isEditMode: false,
      selectedCandidates: [],
      offerId: offerId,
      step:1,
    };
    this.modalService.open(PlanInterviewComponent, {
        size: {
          width: '80%',
          padding: '1rem'
        },
        data: {
          data
        }
      }).then((isDone) => {
          // this.fetchJobOffers();       
      });
    }
  
    
}
