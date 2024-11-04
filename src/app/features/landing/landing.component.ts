import { Component, HostListener } from '@angular/core';
import { HomeComponent } from "./components/home/home.component";
import { HeaderComponent } from './components/header/header.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { LatestCvComponent } from "./components/latest-cv/latest-cv.component";
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HomeComponent, HeaderComponent, ServicesComponent, ContactUsComponent, LatestCvComponent,FontAwesomeModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  isHeaderFixed = false;

  faFacebook = faFacebook;
  faTwitter = faXTwitter;
  faInstagram = faInstagram;
  faLinkedIn = faLinkedin;


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isHeaderFixed = window.scrollY > 0;
  }
}