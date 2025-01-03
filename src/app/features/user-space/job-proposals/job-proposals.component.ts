import { Component, inject } from '@angular/core';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { JobProposalService } from '../../services/job-proposal.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AskDeleteConfirmationComponent } from '../../../shared/components/toasts/ask-delete-confirmation/ask-delete-confirmation.component';
import { ProposalStatus } from '../../../core/models/jobs.models';
import { Toast } from '../../../core/models/common.model';
import { GenericService } from '../../../core/services/generic.service';
import { faEye, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-job-proposals',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, DatePipe],
  templateUrl: './job-proposals.component.html',
  styleUrl: './job-proposals.component.scss'
})
export class JobProposalsComponent {
  faEye = faEye;
  faCheck = faCheck;
  faTimes = faTimes;

  jobProposals: any;
  filteredProposals: any;
  searchQuery: string = '';
  selectedStatus: string = '';
  loading = false;
  private jobProposalService = inject(JobProposalService);
  private modalService = inject(ModalService);
  private genericsService = inject(GenericService);
  private router = inject(Router);
  constructor() {}

  ngOnInit(): void {
    this.loadJobInvitations();
  }
  goToJobDetails(proposal: any) {
    const jobId = proposal ? proposal?.id : null;
    this.router.navigate(['/user/job/details/',jobId]);
  }

  loadJobInvitations() {
    this.loading = true;
    this.jobProposalService.getProposalsForJobSeeker().subscribe({
      next: (proposals) => {
        this.loading = false;
        this.jobProposals = proposals;
        this.filteredProposals = proposals; 
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
          this.loading = true;
          this.jobProposalService.updateProposalStatus(proposalId,ProposalStatus.REJECTED).subscribe({
            next: () => {
              this.loading = false;
              const toastInfos : Toast =  {
                id: 0,
                message: 'Job proposal rejected with success',
                type: 'success',
                timeout: 1500
              }
              this.genericsService.openToast(toastInfos);
              this.loadJobInvitations();
            },
            error: (err) => console.error('there was and error : ', err),
          })
        }
        
      });
     }else{
      const proposalId = proposal.id;
      this.loading = true;
      this.jobProposalService.updateProposalStatus(proposalId,ProposalStatus.ACCEPTED).subscribe({
        next: () => {
          this.loading = false;
          const toastInfos : Toast =  {
            id: 0,
            message: 'Job proposal accepted with success',
            type: 'success',
            timeout: 1500
          }
          this.genericsService.openToast(toastInfos);
          this.loadJobInvitations()

        },
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
