import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faClipboardList, faHourglassHalf, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { JobProposalService } from '../../services/job-proposal.service';
import { AskDeleteConfirmationComponent } from '../../../shared/components/toasts/ask-delete-confirmation/ask-delete-confirmation.component';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { ProposalStatus } from '../../../core/models/jobs.models';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit{

  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faHourglassHalf = faHourglassHalf;
  faClipboardList = faClipboardList;

  jobProposals: any;
  filteredProposals: any;
  searchQuery: string = '';
  selectedStatus: string = '';
  private jobProposalService = inject(JobProposalService);
  private modalService = inject(ModalService);

  stats = {
    applied: 10,
    rejected: 3,
    pending: 5,
    accepted: 2
  };

  // Jobs the user has applied for
  appliedJobs = [
    { jobTitle: 'Frontend Developer', company: 'Company A', dateApplied: '2024-10-01', status: 'Pending' },
    { jobTitle: 'Backend Developer', company: 'Company B', dateApplied: '2024-10-05', status: 'Accepted' },
    { jobTitle: 'Full Stack Developer', company: 'Company C', dateApplied: '2024-10-07', status: 'Rejected' },
    { jobTitle: 'UI/UX Designer', company: 'Company D', dateApplied: '2024-10-08', status: 'Pending' },
    { jobTitle: 'Mobile Developer', company: 'Company E', dateApplied: '2024-10-10', status: 'Pending' },
    { jobTitle: 'DevOps Engineer', company: 'Company F', dateApplied: '2024-10-12', status: 'Accepted' },
    { jobTitle: 'Data Scientist', company: 'Company G', dateApplied: '2024-10-14', status: 'Pending' }
  ];
  // Pagination state
  pageApplied = 1;
  pageWaitingList = 1;
  itemsPerPage = 3;
 
  constructor() {}

  ngOnInit(): void {
    this.loadJobInvitations();
  }

  loadJobInvitations() {
    this.jobProposalService.getProposalsForJobSeeker().subscribe({
      next: (proposals) => {
        this.jobProposals = proposals;
        this.filteredProposals = proposals; 
        this.stats.pending = this.filterProposals.length;
      },
      error: (error) => {
        console.error('Error fetching job proposals:', error);
      }
    });
  }
  acceptOrRejectProposal(decision: boolean,proposal: any) {
     if(decision) {
      const proposalId = proposal.id;
      this.modalService.open(AskDeleteConfirmationComponent, {
        size: {
          width: '100%',
          padding: '1rem'
        },
        data: {
          itemToDelete: `${proposal.jobOffer.title} from ${proposal.jobOffer.company}`,
          type: 'PROPOSAL'
        }
      }).then((data) => {
        const deletionConfirmed = data;
        if(deletionConfirmed) {
          this.jobProposalService.updateProposalStatus(proposalId,ProposalStatus[0]).subscribe({
            next: () => {this.loadJobInvitations()},
            error: (err) => console.error('there was and error : ', err),
          })
        }
        
      });
     }
  
    }

  filterProposals(): void {
    // alert(this.selectedStatus);
    this.filteredProposals = this.jobProposals.filter((proposal:any) => {
      const matchesSearch =
        !this.searchQuery ||
        proposal.jobOffer.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesSearch;
    });
  }


  get displayedAppliedJobs() {
    const startIndex = (this.pageApplied - 1) * this.itemsPerPage;
    return this.appliedJobs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get displayedWaitingListJobs() {
    const startIndex = (this.pageWaitingList - 1) * this.itemsPerPage;
    return this.filteredProposals.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Methods to handle pagination
  nextPageApplied() {
    if (this.pageApplied * this.itemsPerPage < this.appliedJobs.length) {
      this.pageApplied++;
    }
  }

  prevPageApplied() {
    if (this.pageApplied > 1) {
      this.pageApplied--;
    }
  }

  nextPageWaitingList() {
    if (this.pageWaitingList * this.itemsPerPage < this.filteredProposals.length) {
      this.pageWaitingList++;
    }
  }

  prevPageWaitingList() {
    if (this.pageWaitingList > 1) {
      this.pageWaitingList--;
    }
  }
  getTotalPagesWaitingList(): number {
    return Math.ceil(this.filteredProposals.length / this.itemsPerPage);
  }

  // Method to calculate total pages for applied jobs
  getTotalPagesApplied(): number {
    return Math.ceil(this.appliedJobs.length / this.itemsPerPage);
  }

}
