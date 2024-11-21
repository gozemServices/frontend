import { Injectable } from '@angular/core';
import { Education } from '../../../core/models/cv-sections.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { GenericService } from '../../../core/services/generic.service';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private apiUrl = `${environment.cvApiUrl}/education`;

  constructor(private http: HttpClient, private genericService: GenericService) {}

  private getCvId(): number {
    const cvDatas = this.genericService.getCvDatas();
    if (cvDatas?.cv?.id) {
      return cvDatas.cv.id;
    }
    throw new Error('CV ID is not available. Ensure CV data is fetched before using this service.');
  }

  // Get all education data
  getEducationList(): Observable<Education[]> {
    try {
      const cvId = this.getCvId();
      return this.http.get<Education[]>(`${this.apiUrl}/${cvId}`).pipe(
        catchError((error) => {
          console.error('Error fetching education list:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Get a specific education by ID
  getEducationById(id: number): Observable<Education> {
    return this.http.get<Education>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching education with ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  // Create a new education entry
  addEducation(education: Education): Observable<Education> {
    try {
      const cvId = this.getCvId();
      return this.http.post<Education>(`${this.apiUrl}/${cvId}`, education).pipe(
        catchError((error) => {
          console.error('Error adding education:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Update an existing education entry
  updateEducation(id: number, education: Education): Observable<Education> {
    return this.http.put<Education>(`${this.apiUrl}/${id}`, education).pipe(
      catchError((error) => {
        console.error(`Error updating education with ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  // Delete an education entry by ID
  deleteEducation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error deleting education with ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }
}
