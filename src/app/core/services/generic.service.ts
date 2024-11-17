import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private apiUrl = 'http://localhost:8080/api'; 
  private translateService= Inject(TranslateService);
  private languages = ['en','fr','es'];
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  get<T>(endpoint: string) {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }

  post<T>(endpoint: string, data: any) {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data);
  }

  put<T>(endpoint: string, data: any) {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data);
  }

  delete<T>(endpoint: string) {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }

  getLanguages(): string[] {
    return this.languages;
  }
  switchLanguage(language: string) {
    this.translateService.use(language);
  }
}
