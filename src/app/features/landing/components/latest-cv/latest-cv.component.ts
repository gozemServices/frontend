import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-latest-cv',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './latest-cv.component.html',
  styleUrls: ['./latest-cv.component.scss']
})
export class LatestCvComponent{ 

  cvs: any[] = [];  
  private scrollSubscription!: Subscription;

  constructor() {
    // Populate your CVs with random colors
    const baseCvs = Array(20).fill(0).map((_, index) => ({
      image: 'images/people_in_meeting.jpg',
      title: `Web developer ${index + 1}`,
      color: this.getRandomColor() // Assign random color
    }));
    this.cvs = [...baseCvs, ...baseCvs]; // Duplicate the array
  }

  

  // Function to generate random colors
  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
