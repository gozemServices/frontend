import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { FormArray, FormGroup } from '@angular/forms';
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

  fetchCvInfos(): Observable<any> {
    const url = `${environment.apiUrl}/all/user/me`;
    return this.http.get<any>(url);

  }

  saveCvDatas(cvInfos: any) : void{
    sessionStorage.setItem('CV_INFOS',JSON.stringify(cvInfos));
  }
  getCvDatas() : any | null{
    return JSON.parse(sessionStorage.getItem('CV_INFOS') ?? '');
  }

  getLanguages(): string[] {
    return this.languages;
  }
  switchLanguage(language: string) {
    this.translateService.use(language);
  }

  getImageRessource(fileName: string): Observable<Blob> {
    const apiUrl = `${environment.apiUrl}/all/user/uploads/`;
    const headers = new HttpHeaders();
    return this.http.get(`${apiUrl}${fileName}`, { headers, responseType: 'blob' });
  }


  getFormValidationErrors(formGroup: FormGroup | FormArray): any[] {
    const errors: any[] = [];
    
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
  
      if (control instanceof FormGroup || control instanceof FormArray) {
        errors.push(...this.getFormValidationErrors(control));
      } else if (control?.invalid) {
        errors.push({
          control: key,
          errors: control.errors,
          value: control.value,
        });
      }
    });
  
    return errors;
  }
  
}
