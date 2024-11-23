import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { GenericService } from '../../../core/services/generic.service';

@Injectable({
  providedIn: 'root',
})
export class ReferencesService {
  private apiUrl = `${environment.cvApiUrl}/reference`;

  constructor(private http: HttpClient, private genericService: GenericService) {}

  private getCvId(): number {
    const cvDatas = this.genericService.getCvDatas();
    if (cvDatas?.cv?.id) {
      return cvDatas.cv.id;
    }
    throw new Error('CV ID is not available. Ensure CV data is fetched before using this service.');
  }

  // Get all references
  getReferencesList(): Observable<any[]> {
    try {
      const cvId = this.getCvId();
      return this.http.get<any[]>(`${this.apiUrl}/${cvId}`).pipe(
        catchError((error) => {
          console.error('Error fetching references list:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Get a specific reference by ID
  getReferenceById(referenceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${referenceId}`).pipe(
      catchError((error) => {
        console.error(`Error fetching reference with ID ${referenceId}:`, error);
        return throwError(() => error);
      })
    );
  }

  // Add a new reference
  addReference(referenceData: any): Observable<any> {
    try {
      const cvId = this.getCvId();
      return this.http.post<any>(`${this.apiUrl}/${cvId}`, referenceData).pipe(
        catchError((error) => {
          console.error('Error adding reference:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Update an existing reference
  updateReference(referenceId: number, referenceData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${referenceId}`, referenceData).pipe(
      catchError((error) => {
        console.error(`Error updating reference with ID ${referenceId}:`, error);
        return throwError(() => error);
      })
    );
  }

  // Delete a reference by ID
  deleteReference(referenceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${referenceId}`).pipe(
      catchError((error) => {
        console.error(`Error deleting reference with ID ${referenceId}:`, error);
        return throwError(() => error);
      })
    );
  }
}
