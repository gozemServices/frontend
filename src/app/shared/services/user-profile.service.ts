import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  
    private apiUrl = 'https://api.example.com/user'; // Replace with your API URL
  
    constructor(private http: HttpClient) {}
  
    // Fetch user profile
    getUserProfile(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/profile`);
    }
  
    // Fetch user points
    getUserPoints(): Observable<number> {
      return this.http.get<number>(`${this.apiUrl}/points`);
    }
  
    // Fetch user tools
    getUserTools(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/tools`);
    }
  
    // Update user points (e.g., after a purchase)
    updateUserPoints(newPoints: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/points`, { points: newPoints });
    }
  
    // Add a premium tool
    addPremiumTool(toolId: number): Observable<any> {
      return this.http.post(`${this.apiUrl}/tools`, { toolId });
    }
  
    // Remove a premium tool
    removePremiumTool(toolId: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/tools/${toolId}`);
    }
  }
  