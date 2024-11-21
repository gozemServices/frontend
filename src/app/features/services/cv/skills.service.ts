import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { GenericService } from '../../../core/services/generic.service';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private apiUrl = `${environment.cvApiUrl}/skills`;

  constructor(private http: HttpClient, private genericService: GenericService) {}

  private getCvId(): number {
    const cvDatas = this.genericService.getCvDatas();
    if (cvDatas?.cv?.id) {
      return cvDatas.cv.id;
    }
    throw new Error('CV ID is not available. Ensure CV data is fetched before using this service.');
  }

  /**
   * Fetch the list of skills
   * @returns Observable containing the list of skills
   */
  getSkillsList(): Observable<any[]> {
    try {
      const cvId = this.getCvId();
      return this.http.get<any[]>(`${this.apiUrl}/${cvId}`).pipe(
        catchError((error) => {
          console.error('Error fetching skills data:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  /**
   * Add a new skill
   * @param skillData Skill data to be added
   * @returns Observable containing the created skill
   */
  addSkill(skillData: any): Observable<any> {
    try {
      const cvId = this.getCvId();
      return this.http.post<any>(`${this.apiUrl}/${cvId}/add`, skillData).pipe(
        catchError((error) => {
          console.error('Error adding skill:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  /**
   * Update an existing skill
   * @param skillId ID of the skill to be updated
   * @param skillData Updated skill data
   * @returns Observable containing the updated skill
   */
  updateSkill(skillId: number, skillData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${skillId}`, skillData).pipe(
      catchError((error) => {
        console.error(`Error updating skill with ID ${skillId}:`, error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Delete a skill
   * @param skillId ID of the skill to be deleted
   * @returns Observable for the delete operation
   */
  deleteSkill(skillId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${skillId}`).pipe(
      catchError((error) => {
        console.error(`Error deleting skill with ID ${skillId}:`, error);
        return throwError(() => error);
      })
    );
  }
}
