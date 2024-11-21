import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  private baseUrl = `${environment.cvApiUrl}/interests`; // Adjust the endpoint as needed

  constructor(private http: HttpClient) {}

  getInterestsList(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addInterest(interestData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, interestData);
  }

  updateInterest(interestId: number, interestData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${interestId}`, interestData);
  }

  deleteInterest(interestId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${interestId}`);
  }
}
