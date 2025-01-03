import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { JobService } from '../../../features/services/job.service';
import { JobOffer } from '../../../core/models/jobs.models';
import { GenericService } from '../../../core/services/generic.service';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { ModalService } from '../modal/modal.service';
import { JobApplyComponent } from '../../../features/user-space/jobs/job-apply/job-apply.component';
import { ShareItemComponent } from "../share-job/share-item.component";
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../features/auth/auth.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [FontAwesomeModule, TimeAgoPipe, ShareItemComponent],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent implements OnInit{


  job: any; 
  faArrowLeft = faArrowLeft;
  loading = false;
  offer!: any;
  jobId!: any;
  userRole: any;
  JOB_URL = `${environment.appURL}/user/job/details`;

  public genericService = inject(GenericService);
  private modalService = inject(ModalService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private jobService = inject(JobService);
  private authService = inject(AuthService);  
  ngOnInit() : void {
    const idJob = this.route.snapshot.paramMap.get('id');
    this.fetchJobInfos(idJob);
    this.jobId = idJob;
    this.userRole = this.authService.getUserRole() ?? 'recruiter';
  }


  fetchJobInfos(id: any) {
    this.loading = true;
      this.jobService.getJobDetails(id).subscribe({
        next: (offer: any) => {
          console.log(offer)
          this.offer = offer;
          this.loading = false;
          // console.log(this.offer);
        },
        error: (err: any) => {
          console.error('Failed to fetch job details: ', err);
        }
      })
  }

  openApplyDialog(): void {
    // alert("opened");
    this.modalService.open(JobApplyComponent, {
     size: {
       width: '80%',
       padding: '1rem'
     },
     data: {
       selectedOffer: this.jobId,
     }
   }).then((data) => {

     });
 }

  goBack() {
    this.location.back();
  }

  removeChar(input: string, charToRemove: string, charToReplaceWith?: string): string {
    const regex = new RegExp(`\\${charToRemove}`, 'g');
    return input.replace(regex, charToReplaceWith || '');
  }


}
