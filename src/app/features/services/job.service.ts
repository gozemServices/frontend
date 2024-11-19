import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/jobs`;

  // getAllJobs(filters: any): Observable<any> {
  //   return this.http.get(this.baseUrl, { params: filters });
  // }
  getAllJobs(): Observable<any> {
    const headers  = new HttpHeaders({'Content-Type' : 'application/json'})
    return this.http.get(this.baseUrl,{headers, withCredentials: true});
  }
  deleteJobOffer(id: any): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  updateJobOffer(id: any, status: any): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getJobDetails(jobId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${jobId}`);
  }

  applyToJob(jobId: string, applicationData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${jobId}/apply`, applicationData);
  }
}
