import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { GenericService } from '../../../core/services/generic.service';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  private apiUrl = `${environment.cvApiUrl}/socials`;

  constructor(private http: HttpClient, private genericService: GenericService) {}

  private getCvId(): number {
    const cvDatas = this.genericService.getCvDatas();
    if (cvDatas?.cv?.id) {
      return cvDatas.cv.id;
    }
    throw new Error('CV ID is not available. Ensure CV data is fetched before using this service.');
  }

  // Get all social links
  getSocialLinks(): Observable<any[]> {
    try {
      const cvId = this.getCvId();
      return this.http.get<any[]>(`${this.apiUrl}/${cvId}`).pipe(
        catchError((error) => {
          console.error('Error fetching social links:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }


   // Get all social links
   getAllSocialsLinks(): Observable<any[]> {
    try {
      return this.http.get<any[]>(`${this.apiUrl}`).pipe(
        catchError((error) => {
          console.error('Error fetching system social links:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Get a specific social link by ID
  getSocialLinkById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching social link with ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  // Add a new social link
  addSocialLink(socialData: any): Observable<any> {
    try {
      const cvId = this.getCvId();
      return this.http.post<any>(`${this.apiUrl}/${cvId}`, socialData).pipe(
        catchError((error) => {
          console.error('Error adding social link:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Update an existing social link
  updateSocialLink(socialId: number, socialData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${socialId}`, socialData).pipe(
      catchError((error) => {
        console.error(`Error updating social link with ID ${socialId}:`, error);
        return throwError(() => error);
      })
    );
  }

  // Delete a social link by ID
  deleteSocialLink(socialId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${socialId}`).pipe(
      catchError((error) => {
        console.error(`Error deleting social link with ID ${socialId}:`, error);
        return throwError(() => error);
      })
    );
  }
}
