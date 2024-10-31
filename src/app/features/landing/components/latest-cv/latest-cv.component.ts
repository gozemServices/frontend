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
export class LatestCvComponent implements OnInit, OnDestroy { 
  @ViewChild('cvContainer') cvContainer!: ElementRef;
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

  ngOnInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  startAutoScroll() {
    this.scrollSubscription = interval(3000).subscribe(() => {
      this.scrollToRight();
    });
  }

  scrollToRight() {
    const element = this.cvContainer.nativeElement;
    const scrollWidth = 329 + 16; // Card width + margin

    element.scrollLeft += scrollWidth;

    // Reset scroll if it reaches the end
    if (element.scrollLeft >= element.scrollWidth / 2 - element.clientWidth) {
      element.scrollLeft = 0; // Reset to the start
    }
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
