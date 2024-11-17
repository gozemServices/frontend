import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/jobs`;

  getAllJobs(filters: any): Observable<any> {
    return this.http.get(this.baseUrl, { params: filters });
  }

  getJobDetails(jobId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${jobId}`);
  }

  applyToJob(jobId: string, applicationData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${jobId}/apply`, applicationData);
  }
}
