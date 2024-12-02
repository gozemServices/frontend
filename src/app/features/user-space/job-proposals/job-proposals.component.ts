import { Component, inject } from '@angular/core';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { JobProposalService } from '../../services/job-proposal.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faClipboardList, faHourglassHalf, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AskDeleteConfirmationComponent } from '../../../shared/components/toasts/ask-delete-confirmation/ask-delete-confirmation.component';
import { ProposalStatus } from '../../../core/models/jobs.models';

@Component({
  selector: 'app-job-proposals',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './job-proposals.component.html',
  styleUrl: './job-proposals.component.scss'
})
export class JobProposalsComponent {
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
  acceptProposal(decision: boolean,proposal: any) {
     if(!decision) {
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
          this.jobProposalService.updateProposalStatus(proposalId,ProposalStatus[2]).subscribe({
            next: () => {this.loadJobInvitations()},
            error: (err) => console.error('there was and error : ', err),
          })
        }
        
      });
     }else{
      const proposalId = proposal.id;
      this.jobProposalService.updateProposalStatus(proposalId,ProposalStatus[1]).subscribe({
        next: () => {this.loadJobInvitations()},
        error: (err) => console.error('there was and error : ', err),
      })
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

}
