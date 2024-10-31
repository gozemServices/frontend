import { Component } from '@angular/core';
import { HomeComponent } from "./components/home/home.component";
import { HeaderComponent } from './components/header/header.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { LatestCvComponent } from "./components/latest-cv/latest-cv.component";
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HomeComponent, HeaderComponent, ServicesComponent, ContactUsComponent, LatestCvComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}