import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReferencesService {
  private baseUrl = `${environment.cvApiUrl}/references`;

  constructor(private http: HttpClient) {}

  getReferencesList(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addReference(referenceData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, referenceData);
  }

  updateReference(referenceId: number, referenceData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${referenceId}`, referenceData);
  }

  deleteReference(referenceId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${referenceId}`);
  }
}
