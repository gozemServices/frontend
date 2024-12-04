import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';
import { CvthequeService } from '../../../services/cv/cvtheque.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-cv',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './latest-cv.component.html',
  styleUrls: ['./latest-cv.component.scss']
})
export class LatestCvComponent{ 


  cvs: any[] = [];  
  isLoading = false;
  cvList: any[] = [];
  errorMessage: string | null = null;
  private scrollSubscription!: Subscription;
  private router = inject(Router);
  private cvthequeService = inject(CvthequeService);
  constructor() {
    // // Populate your CVs with random colors
    // const baseCvs = Array(20).fill(0).map((_, index) => ({
    //   image: 'images/people_in_meeting.jpg',
    //   title: `Web developer ${index + 1}`,
    //   color: this.getRandomColor() // Assign random color
    // }));
    // this.cvs = [...baseCvs, ...baseCvs]; // Duplicate the array
    this.fetchCvs();
  }


  fetchCvs() {
    this.isLoading = true;
    this.cvthequeService.getAllPublicCvs().subscribe({
      next: (data) => {
        this.cvList = data;
        this.cvList = [...this.cvList, ...this.cvList];
        console.log(this.cvList);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.isLoading = false;
        // Optionally add a user-friendly error message
        this.errorMessage = 'Failed to load CVs. Please try again later.';
      }
    }
    );
  }
  
}
