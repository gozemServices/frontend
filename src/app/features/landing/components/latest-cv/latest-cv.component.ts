import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CvthequeService } from '../../../services/cv/cvtheque.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latest-cv',
  standalone: true,
  imports: [TranslateModule, RouterModule, CommonModule],
  templateUrl: './latest-cv.component.html',
  styleUrls: ['./latest-cv.component.scss']
})
export class LatestCvComponent implements OnInit {
  cvs: any[] = [];
  isLoading = false;

  private cvthequeService = inject(CvthequeService);

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  constructor() {}

  ngOnInit() {
    this.fetchCvs();
  }

  fetchCvs() {
    this.isLoading = true;
    this.cvthequeService.getAllPublicCvs().subscribe({
      next: (data) => {
        this.cvs = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.isLoading = false;
      },
    });
  }

  scrollNext() {
    const carouselElement = this.carousel.nativeElement;
    const scrollAmount = carouselElement.offsetWidth; // Scroll by one full carousel width
    carouselElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  scrollPrev() {
    const carouselElement = this.carousel.nativeElement;
    const scrollAmount = carouselElement.offsetWidth;
    carouselElement.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }
}
