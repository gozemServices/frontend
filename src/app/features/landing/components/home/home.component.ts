import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentSlide = 0;
  translateService = Inject(TranslateService)
  images = [
    'images/people_in_meeting.jpg',
  ];

  ngOnInit() {
    this.autoSlide();
  }

  autoSlide() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    }, 3000); // Change slide every 3 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }
}
