import { Component, inject, OnInit } from '@angular/core';
import { InterviewService } from '../../../services/interview.service';
import { faArrowLeft, faArrowRight, faCheck, faComments, faDownload, faEdit, faEllipsis, faEllipsisH, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { ApplicationStatus } from '../../../../core/models/jobs.models';
import { JobService } from '../../../services/job.service';
import { CandidateInterviewFeedbackComponent } from '../candidate-interview-feedback/candidate-interview-feedback.component';
import { JobInterviewScheduleComponent } from '../job-interview-schedule/job-interview-schedule.component';
import { PlanInterviewComponent } from '../plan-interview/plan-interview.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { InterviewDetailsComponent } from '../interview-details/interview-details.component';

@Component({
  selector: 'app-interviewed',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule,TruncatePipe],
  templateUrl: './interviewed.component.html',
  styleUrl: './interviewed.component.scss'
})
export class InterviewedComponent implements OnInit{

  private interviewService = inject(InterviewService);
  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private modalService = inject(ModalService);
  private jobService = inject(JobService);  
  applicationStatusList = Object.values(ApplicationStatus);
  JobApplicationStatus = ApplicationStatus;


  faEllipsisH = faEllipsisH;
  faEdit = faEdit;
  faComments = faComments;
  faCheck = faCheck;
  faTimes = faTimes;
  faComment = faComments;
  faArrowRight = faArrowRight;
  faDownload  = faDownload;
  faArrowLeft = faArrowLeft;
  faEllipsis = faEllipsis;
  faEye = faEye;

  isLoading = false;
  idOffer : any;
  searchQuery = '';
  interviews: any;
  filteredInterviews: any;
  loading = false;
  statusFilter: 'pending' | 'interview' | 'hired' | 'rejected' | 'all' = 'all';  // Filter by status
  page: number = 1;
  itemsPerPage: number = 5;
  openActionId: string | null = null; 

  ngOnInit(){
    const idOffer = this.route.snapshot.paramMap.get('id');
    this.idOffer = idOffer ?? null;
    if(!this.idOffer) {
      this.goBack();
    }
    this.fetchInterviewed();
  }

  goBack() {
    this.location.back();
  }

  fetchInterviewed(){
    this.loading = true;
    this.interviewService.getScheduleByJobOffer(this.idOffer).subscribe({
      next: (interviews: any) => {
        this.interviews = interviews;
        this.filteredInterviews = interviews;
        this.loading = false;
        console.log(this.interviews);
        this.applyFilters();
      },
      error: (err: any) => {
        console.error('Failed to fetch interviews details details: ', err);
      }
    })

  }


  constructor() {}


  // Filter interviews by search query and status
  applyFilters() {
    // this.filteredInterviews = this.interviews
    //   .filter((c: any) =>
    //     (c?.jobSeeker?.firstname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    //     c?.jobSeeker?.lastname.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
    //     (this.statusFilter === 'all' || c.status === this.statusFilter)
    //   )
    //   .slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
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
  downloadCandidatureFolder(candidature: any){}
  moveToInterview(candidature: any){}
  viewDetails(seeker: any,steps: any){
    const data = {
      seeker: seeker,
      steps: steps,
    };
    this.modalService.open(InterviewDetailsComponent, {
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
  moveToPreInterview(candidature: any){
    
    // alert(candidature.status == this.jobApplicationStatus.INTERVIEW_SCHEDULED);
}

}
