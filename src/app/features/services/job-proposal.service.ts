import { HttpClient } from "@angular/common/http";
import { inject, Inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError, Observable, throwError } from "rxjs";





@Injectable({
    providedIn: 'root'
})
export class JobProposalService {
    private http = inject(HttpClient);
    private baseUrl = `${environment.apiUrl}/all/job-proposals`


 /**
   * Propose a job to job seekers.
   * @param jobOfferId - ID of the job offer.
   * @param jobSeekerIds - List of job seeker IDs.
   * @returns Observable with the response.
   */
    proposeJob(jobOfferId: number, jobSeekerIds: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/propose/${jobOfferId}`, jobSeekerIds);
  }

   /**
   * Update the status of a job proposal.
   * @param proposalId - ID of the proposal.
   * @param status - New status for the proposal.
   * @returns Observable with the response.
   */
   updateProposalStatus(proposalId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${proposalId}/status`, null, {
      params: { status }
    });
  }

   /**
   * Get job proposals for the authenticated job seeker.
   * @returns Observable with the list of job proposals.
   */
   getProposalsForJobSeeker(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  /**
   * Get job proposals sent by the authenticated employer.
   * @returns Observable with the list of job proposals.
   */
  getProposalsForEmployer(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employer`);
  }

  /**
   * Remove a job proposal.
   * @param proposalId - ID of the proposal to be removed.
   * @returns Observable with the response.
   */
  removeProposal(proposalId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${proposalId}`);
  }
}