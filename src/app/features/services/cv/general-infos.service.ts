import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { GenericService } from '../../../core/services/generic.service';
import { CVDetailRequest } from '../../../core/models/cv-sections.model';

@Injectable({
  providedIn: 'root',
})
export class GeneralInfosService {
  private cvApiUrl = `${environment.cvApiUrl}`;
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private genericService: GenericService) {}

  private getCvId(): number {
    const cvDatas = this.genericService.getCvDatas();
    if (cvDatas?.cv?.id) {
      return cvDatas.cv.id;
    }
    throw new Error('CV ID is not available. Ensure CV data is fetched before using this service.');
  }


  getCvGeneralInfos(): any {
    const cvDatas = this.genericService.getCvDatas();
    if (cvDatas) {
      // console.log(cvDatas);
      return cvDatas;
    }
    throw new Error('CV ID is not available. Ensure CV data is fetched before using this service.');
  }

  /***
   * /api/applicant/cv/me
   */
  getGeneralInfo(): Observable<any> {
    try {
      const cvId = this.getCvId();
      return this.http.get<any>(`${this.apiUrl}/all/user/me`).pipe(
        catchError((error) => {
          console.error('Error fetching general information:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }
  /*** // Update general information
   * apiurl/update/details/{cvId}
   */
  updateGeneralInfo(infoData: CVDetailRequest): Observable<any> {
    try {
      const cvId = this.getCvId();
      return this.http.put<any>(`${this.cvApiUrl}/update/details/${cvId}`, infoData).pipe(
        catchError((error) => {
          console.error('Error updating general information:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }
}
