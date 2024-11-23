import { Injectable } from '@angular/core';
// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CvthequeService {
    private baseUrl = environment.cvApiUrl;
  
    constructor(private http: HttpClient) {}
  
    /**
     * Get all CVs from the CVTheque.
     */
    getAllCvs(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}`);
    }
  
    /**
     * Get a single CV by its ID.
     * @param id - The ID of the CV.
     */
    getCvById(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/cvs/${id}`);
    }
  
    /**
     * Create a new CV.
     * @param cv - The CV data to create.
     */
    createCv(cv: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/cvs`, cv);
    }
  
    /**
     * Update an existing CV.
     * @param id - The ID of the CV to update.
     * @param cv - The updated CV data.
     */
    updateCv(id: number, cv: any): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/cvs/${id}`, cv);
    }
  
    /**
     * Delete a CV by its ID.
     * @param id - The ID of the CV to delete.
     */
    deleteCv(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/cvs/${id}`);
    }
    /**
     * Search CVs by criteria (e.g., name, skills, etc.).
     * @param searchCriteria - The criteria for the search.
     */
    searchCvs(searchCriteria: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/search`, searchCriteria);
    }
  }

