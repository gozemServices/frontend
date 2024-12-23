import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { GenericService } from '../../../core/services/generic.service';

@Injectable({
  providedIn: 'root',
})
export class InterestsService {
  private apiUrl = `${environment.cvApiUrl}/interests`;

  constructor(private http: HttpClient, private genericService: GenericService) {}

  private getCvId(): number {
    const cvDatas = this.genericService.getCvDatas();
    if (cvDatas?.cv?.id) {
      return cvDatas.cv.id;
    }
    throw new Error('CV ID is not available. Ensure CV data is fetched before using this service.');
  }

  // Get all interests
  getInterestsList(): Observable<any[]> {
    try {
      const cvId = this.getCvId();
      return this.http.get<any[]>(`${this.apiUrl}/${cvId}`).pipe(
        catchError((error) => {
          console.error('Error fetching interests list:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Get a specific interest by ID
  getInterestById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching interest with ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  // Add a new interest
  addInterest(interestData: any): Observable<any> {
    try {
      const cvId = this.getCvId();
      return this.http.post<any>(`${this.apiUrl}/${cvId}`, interestData).pipe(
        catchError((error) => {
          console.error('Error adding interest:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Update an existing interest
  updateInterest(interestId: number, interestData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${interestId}`, interestData).pipe(
      catchError((error) => {
        console.error(`Error updating interest with ID ${interestId}:`, error);
        return throwError(() => error);
      })
    );
  }

  // Delete an interest by ID
  deleteInterest(interestId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${interestId}`).pipe(
      catchError((error) => {
        console.error(`Error deleting interest with ID ${interestId}:`, error);
        return throwError(() => error);
      })
    );
  }
}
