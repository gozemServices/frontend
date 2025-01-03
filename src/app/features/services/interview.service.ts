import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApplicationStatus, JobApplicationUpdateDTO } from '../../core/models/jobs.models';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private _candidatesList = signal<number[]>([]);
  private jobUrl = `${environment.apiUrl}/all/job`;
  private apiUrl = `${environment.apiUrl}/all/job/schedule-interview-group`;
  private http = inject(HttpClient);

  // Getter for the signal
  get candidatesList() {
    return this._candidatesList; // Prevent external mutation
  }

  // Add a candidate to the list
  addCandidate(candidateId: number) {
    const currentList = this._candidatesList();
    if (!currentList.includes(candidateId)) {
      this._candidatesList.update((candidateList) => [...candidateList, candidateId]);    }
      // console.log(this.candidatesList());
    }

  // Remove a candidate from the list
  removeCandidate(candidateId: number) {
    const currentList = this._candidatesList();
    this._candidatesList.update((candidateList) =>
      currentList.filter((id) => id !== candidateId)
    );
    // console.log(this.candidatesList());
  }

  // Clear the list
  clearCandidates() {
    this._candidatesList.update((candidateList) => []);
  }


  createOrUpdateSchedule(scheduleData: any): Observable<any> {
    if (scheduleData.id) {
      console.log(scheduleData);
      return this.http.put(`${this.jobUrl}/interview/edit/${scheduleData.id}`, scheduleData);
    } else {
      return this.http.post(this.apiUrl, scheduleData);
    }
  }

  updateApplicationStatus(
    jobApplicationId: any, 
    status: ApplicationStatus,
    comment?: string
  ) {
    const url = `${this.jobUrl}/jobApplication/update/status/${jobApplicationId}`;
    const params: any = {status};
    if(comment) {params.comment = comment}
    return this.http.put(url,null,{params});
  }

  // Method to fetch the schedule for a specific job offer
  getScheduleByJobOffer(jobOfferId: number): Observable<any> {
    const url = `${environment.apiUrl}/all/job/interviews`;
    return this.http.get(`${url}/${jobOfferId}`);
  }
  AddJobInterviewNote(dto: JobApplicationUpdateDTO): Observable<any> {
    return this.http.post(`${this.jobUrl}/update`, dto);
  }

  downloadSubmittedDocument(jobApplicationId: number): Observable<Blob> {
    const url = `${this.jobUrl}/download/${jobApplicationId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  deleteInterview(interviewGroupId: number): Observable<void> {
    return this.http.delete<void>(`${this.jobUrl}/${interviewGroupId}`);
  }

  removeJobSeekerFromInterview(
    interviewGroupId: number,
    jobSeekerId: number
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.jobUrl}/interview/delete/${interviewGroupId}/jobseekers/${jobSeekerId}`
    );
  }



  // You can also add more methods as needed to support your specific API interactions
  
}
