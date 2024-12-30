import { Component, inject } from '@angular/core';
import { ApplicationStatus, Candidature } from '../../../core/models/jobs.models';

import { FormsModule } from '@angular/forms';
import {faEye, faArrowRight, faArrowLeft, faEllipsisH, faEdit, faComments, faCheck, faTimes, faComment, faFileExcel } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { JobInterviewScheduleComponent } from '../interviews/job-interview-schedule/job-interview-schedule.component';
import { CandidateInterviewFeedbackComponent } from '../interviews/candidate-interview-feedback/candidate-interview-feedback.component';
import { PlanInterviewComponent } from '../interviews/plan-interview/plan-interview.component';
import { CommonModule } from '@angular/common';
import { InterviewService } from '../../services/interview.service';
import { GenericService } from '../../../core/services/generic.service';
import { Toast } from '../../../core/models/common.model';



@Component({
  selector: 'app-candidatures',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule,CommonModule], 
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
  openActionId: string | null = null; 

  // Define the icons as properties
  faEllipsisH = faEllipsisH;
  faEdit = faEdit;
  faComments = faComments;
  faCheck = faCheck;
  faTimes = faTimes;
  faComment = faComments;

  faEye = faEye;
  faDownload = faFileExcel;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;



  private route = inject(ActivatedRoute);
  private jobService = inject(JobService);  
  private modalService = inject(ModalService);
  private interviewService = inject(InterviewService);
  private genericService = inject(GenericService);
  applicationStatusList = Object.values(ApplicationStatus);
  JobApplicationStatus = ApplicationStatus;
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


    toggleActions(id: string) {
    this.openActionId = this.openActionId === id ? null : id;
  }

  noteInterview(candidature: any) {
    this.modalService.open(CandidateInterviewFeedbackComponent, {
      size: {
        width: '80%',
        padding: '1rem'
      },
      data: {
      }
    }).then((isDone) => {
      // this.fetchJobOffers();       
    });
  }

  planInterview(candidature: any) {
    this.modalService.open(JobInterviewScheduleComponent, {
      size: {
        width: '80%',
        padding: '1rem'
      },
      data: {
      }
    }).then((isDone) => {
        // this.fetchJobOffers();       
    });
  }

 


  editInterview(candidature: any){
      const data = {
        isEditMode: true,
        selectedCandidates: [],
        step:2,
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
  downloadCandidatureFolder(seeker: any): void{
    const jobApplicationId = seeker.jobApplicationId;
      this.interviewService.downloadSubmittedDocument(jobApplicationId).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `document-${jobApplicationId}.pdf`; // Adjust file name and extension as necessary
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Error downloading the document:', error);
        }
      });
  }
  moveToInterview(candidature: any){}
  moveToPreInterview(jobApplicationId: any){
      this.loading = true
      const toastInfos: Toast = {
        id: 0,
        message: '',
        type: 'success',
        timeout: 1000,
      }
      this.interviewService.updateApplicationStatus(jobApplicationId,ApplicationStatus.PRE_INTERVIEW).subscribe({
        
        next: (response) => {
          // console.log('Interview schedule saved successfully:', response);
          toastInfos.message = 'Candidate moved to preinterview successfully';
          this.genericService.openToast(toastInfos);
          this.loading = false;
        },
        error: (error) => {
          // console.error('Error saving interview schedule:', error);
          toastInfos.message = 'Error moving candidate to preinterview';
          toastInfos.type = 'error';
          this.genericService.openToast(toastInfos);
          this.loading = false;
        }
      });
      
      // alert(candidature.status == this.jobApplicationStatus.INTERVIEW_SCHEDULED);
  }


  exportApplicationsToCsv(filter?: string){
    const offerId = this.idOffer;

    this.jobService.exportJobApplications(offerId, filter).subscribe((blob) => {
      // Create a link element to download the file
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'job_applications.csv';
      a.click();
      URL.revokeObjectURL(objectUrl); // Clean up
    });
  }

}