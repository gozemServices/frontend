import { Component, inject, OnInit } from '@angular/core';
import { JobService } from '../../../services/job.service';
import { JobOffer } from '../../../../core/models/jobs.models';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { FormsModule } from '@angular/forms';
import { JobProposalService } from '../../../services/job-proposal.service';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { GenericService } from '../../../../core/services/generic.service';
import { Toast } from '../../../../core/models/common.model';

@Component({
  selector: 'app-proposal-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proposal-modal.component.html',
  styleUrls: ['./proposal-modal.component.scss']
})
export class ProposalModalComponent implements OnInit {
  isLoading = false;
  jobOffers!: JobOffer[];
  jobId!: number; // Will store the selected job ID
  selectedCv!: number; // For demonstration purposes
  private jobService = inject(JobService);
  private jobProposalService = inject(JobProposalService);
  private modalService = inject(ModalService);
  private genericsService = inject(GenericService);

  constructor() {}

  ngOnInit() {
    this.fetchJobOffers();
  }

  fetchJobOffers() {
    this.isLoading = true; 
    this.jobService.getAllJobs().subscribe({
      next: (offers: JobOffer[]) => {
        this.jobOffers = offers;
        this.isLoading = false; 
      },
      error: (err: any) => {
        console.error('Failed to fetch job offers:', err);
        this.isLoading = false;  
      },
    });
  }

  proposeJob() {
    // alert(`Job ID: ${this.jobId} proposed to CV ID: ${this.selectedCv}`);
    this.isLoading = true; 
    this.jobProposalService.proposeJob(this.jobId, [this.selectedCv]).subscribe({
      next: (response) => {
        this.isLoading = false;
        const toastInfos : Toast =  {
          id: 0,
          message: 'Job proposal send with success',
          type: 'success',
          timeout: 1000
        }
        this.genericsService.openToast(toastInfos);
      },
      error: (err: any) => {
        console.error('Failed to fetch job offers:', err);
        this.isLoading = false;  
      },
    });
  }

  onClose() {
    this.modalService.close();
  }
}
