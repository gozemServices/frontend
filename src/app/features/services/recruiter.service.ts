import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/all/job`;

  createJob(jobData: any): Observable<any> {
    return this.http.post(this.baseUrl, jobData);
  }

  updateJob(jobId: string, jobData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${jobId}`, jobData);
  }

  deleteJob(jobId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${jobId}`);
  }

  getApplications(jobId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${jobId}/applications`);
  }

}
