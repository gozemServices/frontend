import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/all/job`;
  private applicantApi = `${environment.apiUrl}/`

  // getAllJobs(filters: any): Observable<any> {
  //   return this.http.get(this.baseUrl, { params: filters });
  // }
  getAllJobs(): Observable<any> {
    const headers  = new HttpHeaders({'Content-Type' : 'application/json'})
    return this.http.get(`${this.baseUrl}`,{headers, withCredentials: true});
  }

  getAllRecruiterOffers(): Observable<any> {
    const headers  = new HttpHeaders({'Content-Type' : 'application/json'})
    return this.http.get(`${this.baseUrl}/employer`,{headers, withCredentials: true});
  }

  deleteJobOffer(jobId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${jobId}`).pipe(
      catchError((error) => {
        console.error(`Error deleting joboffer with ID ${jobId}:`, error);
        return throwError(() => error);
      })
    );
  }


  updateJobOffer(id: any, status: any): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getJobDetails(jobId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${jobId}`);
  }

  applyToJob(offerId: number,cv?: File,coverLetter?: File): Observable<any> {
    const formData = new FormData();
    if (cv) {
      formData.append('cv', cv);
    }
    if (coverLetter) {
      formData.append('coverLetter', coverLetter);
    }
    const url = `${this.baseUrl}/apply/${offerId}`;
    return this.http.post(url, formData);
  }

  /**
   * Fetches all applications for the authenticated user.
   */
  getAllApplications(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.baseUrl}/applications/all`, { headers, withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error fetching all applications:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Fetches all applications for a specific job offer by its ID.
   * @param jobOfferId - The ID of the job offer.
   */
  getAllApplicationsByOffer(jobOfferId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.baseUrl}/applications/employer/${jobOfferId}`, { headers, withCredentials: true }).pipe(
      catchError((error) => {
        console.error(`Error fetching applications for job offer ID ${jobOfferId}:`, error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Fetches all applications submitted by the authenticated job seeker.
   */
  getAllApplicationsByJobSeeker(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.baseUrl}/applications`, { headers, withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error fetching applications by job seeker:', error);
        return throwError(() => error);
      })
    );
  }


  exportJobApplications(offerId: number, filter?: string): Observable<Blob> {
    let params = new HttpParams().set('offerId', offerId.toString());
    if (filter) {
      params = params.set('filter', filter);
    }

    // Sending GET request with params and expecting a CSV file in response
    return this.http.get(`${this.baseUrl}/export`, {
      params,
      responseType: 'blob',
    });
  }
}
