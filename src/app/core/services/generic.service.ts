import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private apiUrl = 'http://localhost:8080/api'; 
  private translateService= Inject(TranslateService);
  private languages = ['en','fr','es']

  constructor(private http: HttpClient) {}

  getData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`);
  }

  postData<T>(endpoint: string, payload: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, payload);
  }




  getLanguages(): string[] {
    return this.languages;
  }
  switchLanguage(language: string) {
    this.translateService.use(language);
  }
}
