import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // corrected to styleUrls
})
export class HomeComponent implements OnInit, OnDestroy {
  phrases: string[] = [];
  currentPhraseIndex = 0;
  displayedText = '';
  typingSpeed = 80; // Speed of typing
  erasingSpeed = 25; // Speed of erasing
  pauseBetween = 1000; // Pause between phrases
  typingTimeout: any;

  currentSlide = 0;
  images = [
    'images/people_in_meeting.jpg',
    'images/man_giving_hand.jpg',
    'images/people_in_meeting_from_top.jpg',
    'images/sav_calling.jpg',
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    // Load translated phrases
    this.translate.get(['FIND_TALENTS', 'FIND_JOBS']).subscribe(translations => {
      this.phrases = [translations['FIND_TALENTS'], translations['FIND_JOBS']];
      this.type(); // Start typing after fetching translations
    });

    this.autoSlide();
  }

  autoSlide() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    }, 1700); // Change slide every 3 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  type() {
    const currentPhrase = this.phrases[this.currentPhraseIndex];
    this.displayedText += currentPhrase.charAt(this.displayedText.length);
    
    if (this.displayedText.length === currentPhrase.length) {
      this.typingTimeout = setTimeout(() => this.erase(), this.pauseBetween);
    } else {
      this.typingTimeout = setTimeout(() => this.type(), this.typingSpeed);
    }
  }

  erase() {
    this.displayedText = this.displayedText.slice(0, -1);
    
    if (this.displayedText.length === 0) {
      this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
      this.typingTimeout = setTimeout(() => this.type(), this.pauseBetween);
    } else {
      this.typingTimeout = setTimeout(() => this.erase(), this.erasingSpeed);
    }
  }

  ngOnDestroy() {
    clearTimeout(this.typingTimeout);
  }


}
