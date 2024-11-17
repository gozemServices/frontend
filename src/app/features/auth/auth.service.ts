import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';


export const isAuthenticated = signal(false);
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiAuthUrl}`;

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
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Store JWT in sessionStorage
  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
    isAuthenticated.set(true); // Update signal state
  }

  // Get JWT from sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Logout method - clears JWT
  logout(): void {
    sessionStorage.removeItem('token');
    isAuthenticated.set(false); // Update signal state
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
}