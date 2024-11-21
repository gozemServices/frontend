import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../../core/models/common.model';


export const isAuthenticated = signal(false);
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiAuthUrl}`;
  private allApiUrl = `${environment.allApiUrl}`
  user = signal<User | null>(null);
  constructor(private http: HttpClient, private router: Router) {}

  // Signup method
  signup(userType: string, data: FormData): Observable<any> {
    const endpoint = userType === 'user' 
    ? `${this.apiUrl}/register` 
    : `${this.apiUrl}/register-employeer`;
    // const headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});
    return this.http.post(endpoint, data);  
  }

  signupUser(data: FormData): Observable<any> {
    const endpoint = `${this.apiUrl}/register`;
    // const headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});
    return this.http.post(endpoint, data);
  }

   
  signupRecruiter(data: any): Observable<any> {
    const endpoint = `${this.apiUrl}/register-employeer`;
    // const headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});
    return this.http.post(endpoint, data);
  }

  // Login method - stores JWT in sessionStorage
  login(email: string, password: string): Observable<any> {
    const headers  = new HttpHeaders({'Content-Type' : 'application/json'}) 
    return this.http.post(`${this.apiUrl}/login`, { email, password }, {headers, observe: 'response'} );
  }

  // Store JWT in sessionStorage
  saveToken(token: string): void {
    sessionStorage.setItem('AUTH_TOKEN', token);
    isAuthenticated.set(true);
  }
  saveUserType(userType: string) : void {
    sessionStorage.setItem('AUTH_USER_ROLE',userType);
  }
  saveAuthUser(user: User) : void {
    sessionStorage.setItem('AUTH_USER',JSON.stringify(user));
    this.user.set(user);
  }
  // Get JWT from sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem('AUTH_TOKEN');
  }

  getUserRole() : string  | null{
    return sessionStorage.getItem('AUTH_USER_ROLE') ?? null;
  }

  getUser() : User | null{
    return JSON.parse(sessionStorage.getItem('AUTH_USER') ?? '');
  }

  // Logout method - clears JWT
  logout(): void {
    sessionStorage.removeItem('AUTH_TOKEN');
    sessionStorage.removeItem('AUTH_USER');
    sessionStorage.removeItem('AUTH_USER_ROLE');
    sessionStorage.removeItem('CV_INFOS');
    isAuthenticated.set(false);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  // Optionally check if the token has expired
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    const exp = decoded.exp;
    return exp < Date.now() / 1000;
  }

  // Decode JWT to read payload
  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  // Send request with token verification
  getProtectedData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/protected`, {
      headers: this.getHeaders(),
    });
  }

  // Headers with token for protected routes
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getDashboardRoute(role: string): string {
    switch (role) {
      case 'APPLICANT':
        return 'user/jobseeker/dashboard/';
      case 'RECRUITER':
      case 'ADMIN':
        return 'user/recruiter/admin/dashboard/';
      default:
        throw new Error('Unknown user role');
    }
  }

   handleError(error: any): string {
    return error.error?.message || 'An error occurred. Please try again.';
  }


  updatePassword(user: User | null, currentPassword: string, newPassword: string): Observable<any> {
    const endpoint = `${this.allApiUrl}/update-password`;
    const headers = new HttpHeaders({
       'Content-Type': 'application/json' ,
        'Authorization': this.getToken() ?? ''
      });
    const updatePasswordDto = {currentPassword,newPassword}
    const body = {user,updatePasswordDto};

    return this.http.put(endpoint,body, {headers});
    // // Send HTTP request to update password
    // return this.http.patch(endpoint, body, { headers }).pipe(
    //   tap((response) => {
    //     // Optionally handle any actions after successful password update
    //     console.log('Password updated successfully:', response);
    //   }),
    //   // Handle errors in response
    //   catchError((error) => {
    //     console.error('Error updating password:', error);
    //     throw error;
    //   })
    // );
  }
}