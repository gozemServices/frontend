import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialsService {

  private baseUrl = `${environment.cvApiUrl}/socials`; // Adjust the endpoint as needed

  constructor(private http: HttpClient) {}

  getSocialsList(): Observable<any[]> {
    const headers  = new HttpHeaders({'Content-Type' : 'application/json'})
    return this.http.get<any[]>(this.baseUrl,{headers, withCredentials: true});
  }

  addSocial(socialData: any): Observable<any> {
    const headers  = new HttpHeaders({'Content-Type' : 'application/json'})
    return this.http.post<any>(this.baseUrl, socialData,{headers, withCredentials: true});
  }

  updateSocial(socialId: number, socialData: any): Observable<any> {
    const headers  = new HttpHeaders({'Content-Type' : 'application/json'})
    return this.http.put<any>(`${this.baseUrl}/${socialId}`, socialData,{headers, withCredentials: true});
  }

  deleteSocial(socialId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${socialId}`);
  }
}
