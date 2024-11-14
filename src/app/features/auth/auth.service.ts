import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:9000/api/public/';
  private currentUserSubject = new BehaviorSubject<any>(null);
  private http = inject(HttpClient);

  constructor() {
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    const token = localStorage.getItem('jwtToken');
    if (token && !this.isTokenExpired(token)) {
      this.currentUserSubject.next(this.decodeToken(token));
    }
  }

  get currentUser() {
    return this.currentUserSubject.asObservable();
  }

  register(data: any) {
    return this.http.post(`${this.authUrl}/register`, data);
  }
  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.authUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('jwtToken', response.token);
        this.currentUserSubject.next(this.decodeToken(response.token));
      })
    );
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.currentUserSubject.next(null);
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.authUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, password: string) {
    return this.http.post(`${this.authUrl}/reset-password`, { token, password });
  }

  refreshToken() {
    return this.http.post<{ token: string }>(`${this.authUrl}/refresh-token`, {}).pipe(
      tap(response => {
        localStorage.setItem('jwtToken', response.token);
        this.currentUserSubject.next(this.decodeToken(response.token));
      })
    );
  }

  isAuthenticated() {
    const token = localStorage.getItem('jwtToken');
    return token && !this.isTokenExpired(token);
  }

  // Helper methods for JWT
  private decodeToken(token: string) {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }

  private isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    const expirationTime = decodedToken.exp * 1000;
    return Date.now() > expirationTime;
  }
}
