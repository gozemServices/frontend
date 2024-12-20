import { Injectable } from '@angular/core';
// import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CvthequeService {
    private baseUrl = environment.cvApiUrl;
    private apiUrl = `${environment.apiUrl}/all/filter`;
  
    constructor(private http: HttpClient) {}
  
    /**
     * Get all CVs from the CVTheque.
     */
    getAllCvs(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}`,{withCredentials: true});
    }
    getAllPublicCvs(): Observable<any> {
      return this.http.get<any>(`${environment.apiUrl}/public/cv`);
    }

    /**
     * 
     * */ 
    getFilteredCvs(filters: { skills?: string[]; jobTitles?: string[]; languages?: string[] }): Observable<any> {
      const params = new URLSearchParams();
    
      if (filters.skills && filters.skills.length) {
        params.append('skills', filters.skills.join(','));
      }
      if (filters.jobTitles && filters.jobTitles.length) {
        params.append('jobTitles', filters.jobTitles.join(','));
      }
      if (filters.languages && filters.languages.length) {
        params.append('languages', filters.languages.join(','));
      }
    
      const query = params.toString();
      return this.http.get<any>(`${this.apiUrl}?${query}`);
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

   // Service method to fetch CV (ArrayBuffer response)
    printCv(userId: number): Observable<ArrayBuffer> {
      return this.http.get<ArrayBuffer>(`${this.baseUrl}/${userId}/generate-pdf`, { responseType: 'arraybuffer' as 'json' });
    }

    
    
  }

