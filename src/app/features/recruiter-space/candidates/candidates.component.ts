import { Component, inject } from '@angular/core';
import { JobProposalService } from '../../services/job-proposal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { AskDeleteConfirmationComponent } from '../../../shared/components/toasts/ask-delete-confirmation/ask-delete-confirmation.component';
import { ProposalStatus } from '../../../core/models/jobs.models';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule,FormsModule, FontAwesomeModule],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent {
  faDelete = faDeleteLeft;

  jobProposals: any;
  filteredProposals: any;
  searchQuery: string = '';
  selectedStatus: string = '';

  constructor() {}
  private jobProposalService = inject(JobProposalService);
  private modalService = inject(ModalService);
  ngOnInit(): void {
    this.fetchJobProposals();
  }

  /**
   * Fetch all job proposals sent by the logged-in recruiter.
   */
  fetchJobProposals(): void {
    this.jobProposalService.getProposalsForEmployer().subscribe({
      next: (proposals) => {
        this.jobProposals = proposals;
        this.filteredProposals = proposals; 
        console.log(this.jobProposals);
      },
      error: (error) => {
        console.error('Error fetching job proposals:', error);
      }
    });
  }

  /**
   * Filter proposals based on the search query and selected status.
   */
  filterProposals(): void {
    // alert(this.selectedStatus);
    this.filteredProposals = this.jobProposals.filter((proposal:any) => {
      const matchesSearch =
        !this.searchQuery ||
        proposal.jobOffer.title.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus =
        !this.selectedStatus || proposal.status.toLowerCase() === this.selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }


  removeProposal(proposal: any) {
    const proposalId = proposal.id;
    // console.log(proposal.jobOffer);
    // alert(ProposalStatus[3]);
    this.modalService.open(AskDeleteConfirmationComponent, {
      size: {
        width: '100%',
        padding: '1rem'
      },
      data: {
        itemToDelete: `${proposal.jobOffer.title} proposal to ${proposal.jobSeeker.email}`,
        type: 'PROPOSAL'
      }
    }).then((data) => {
      const deletionConfirmed = data;
      if(deletionConfirmed) {
        this.jobProposalService.removeProposal(proposalId).subscribe({
          next: () => {this.fetchJobProposals()},
          error: (err) => console.error('there was and error : ', err),
        })
      }
      
    });

  }

}
