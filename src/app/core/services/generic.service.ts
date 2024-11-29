import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { FormArray, FormGroup } from '@angular/forms';
import { Toast } from '../models/common.model';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { ModalService } from '../../shared/components/modal/modal.service';
@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private apiUrl = 'http://localhost:8080/api'; 
  private translateService= Inject(TranslateService);
  private modalService = inject(ModalService);
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


  openToast(toast: Toast) {
    this.modalService.open(ToastComponent, {
      size: {
        width: '80%',
        padding: '1rem'
      },
      data: {
        toast: toast
      }
    })
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
  
  timeAgo(createdAt: string | Date): string {
    const now = new Date();
    const createdDate = new Date(createdAt);
    // alert(createdAt);
   if(!createdAt) {
    return 'just now'
   }else {
    const diffInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else {
      return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    }
   }
  }
}
