import { Injectable } from '@angular/core';
import { Experience } from '../../../core/models/cv-sections.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { GenericService } from '../../../core/services/generic.service';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private apiUrl = `${environment.cvApiUrl}/experiences`;

  constructor(private http: HttpClient, private genericService: GenericService) {}

  private getCvId(): number {
    const cvDatas = this.genericService.getCvDatas();
    if (cvDatas?.cv?.id) {
      return cvDatas.cv.id;
    }
    throw new Error('CV ID is not available. Ensure CV data is fetched before using this service.');
  }

  // Get all experience data
  getExperienceList(): Observable<Experience[]> {
    try {
      const cvId = this.getCvId();
      return this.http.get<Experience[]>(`${this.apiUrl}/${cvId}`).pipe(
        catchError((error) => {
          console.error('Error fetching experience list:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Get a specific experience by ID
  getExperienceById(id: number): Observable<Experience> {
    return this.http.get<Experience>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching experience with ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  // Create a new experience entry
  addExperience(experience: Experience): Observable<Experience> {
    try {
      const cvId = this.getCvId();
      return this.http.post<Experience>(`${this.apiUrl}/${cvId}/add`, experience).pipe(
        catchError((error) => {
          console.error('Error adding experience:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Update an existing experience entry
  updateExperience(id: number, experience: Experience): Observable<Experience> {
    return this.http.put<Experience>(`${this.apiUrl}/${id}`, experience).pipe(
      catchError((error) => {
        console.error(`Error updating experience with ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  // Delete an experience entry by ID
  deleteExperience(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error deleting experience with ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }
}
