
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../services/job.service';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { JobInterviewScheduleComponent } from "../job-interview-schedule/job-interview-schedule.component";
@Component({
  selector: 'app-plan-interview',
  standalone: true,
  imports: [FormsModule, CommonModule, JobInterviewScheduleComponent],
  templateUrl: './plan-interview.component.html',
  styleUrl: './plan-interview.component.scss'
})
export class PlanInterviewComponent implements OnInit{
  data: any;
  loading = false;
  selectedCandidates: number[] = []
  candidatures: any;  // List of candidatures
  filteredCandidatures: any;
  idOffer: any;
  searchQuery: string = ''; 
  step!: number;
  private modalService = inject(ModalService);
  private jobService = inject(JobService);
  ngOnInit() {
    if(this.data?.isEditMode){

    }else{
      this.loadApplicantList(this.data.offerId);
      this.step = this.data.step;
      console.log(this.data); 
    }
  }

  loadApplicantList(id: any){
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
  // Filter candidatures by search query and status
  applyFilters() {
    this.filteredCandidatures = this.candidatures
      .filter((c: any) =>
        (c.jobSeekerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        c.jobOfferTitle.toLowerCase().includes(this.searchQuery.toLowerCase()))
      )
  } 
  toggleStep(step: number) {
      this.step = step;
  }
  close() {
    this.modalService.close();
  }

  
}
