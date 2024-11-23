import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { GenericService } from '../../../core/services/generic.service';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  private apiUrl = `${environment.cvApiUrl}/language`;

  constructor(private http: HttpClient, private genericService: GenericService) {}

  private getCvId(): number {
    const cvDatas = this.genericService.getCvDatas();
    if (cvDatas?.cv?.id) {
      return cvDatas.cv.id;
    }
    throw new Error('CV ID is not available. Ensure CV data is fetched before using this service.');
  }

  // Get all languages
  getLanguagesList(): Observable<any[]> {
    try {
      const cvId = this.getCvId();
      return this.http.get<any[]>(`${this.apiUrl}/${cvId}`).pipe(
        catchError((error) => {
          console.error('Error fetching languages list:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Get a specific language by ID
  getLanguageById(languageId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${languageId}`).pipe(
      catchError((error) => {
        console.error(`Error fetching language with ID ${languageId}:`, error);
        return throwError(() => error);
      })
    );
  }

  // Add a new language
  addLanguage(languageData: any): Observable<any> {
    try {
      const cvId = this.getCvId();
      return this.http.post<any>(`${this.apiUrl}/${cvId}`, languageData).pipe(
        catchError((error) => {
          console.error('Error adding language:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Update an existing language
  updateLanguage(languageId: number, languageData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${languageId}`, languageData).pipe(
      catchError((error) => {
        console.error(`Error updating language with ID ${languageId}:`, error);
        return throwError(() => error);
      })
    );
  }

  // Delete a language by ID
  deleteLanguage(languageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${languageId}`).pipe(
      catchError((error) => {
        console.error(`Error deleting language with ID ${languageId}:`, error);
        return throwError(() => error);
      })
    );
  }
}
