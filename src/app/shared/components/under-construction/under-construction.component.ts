import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-under-construction',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './under-construction.component.html',
  styleUrl: './under-construction.component.scss'
})
export class UnderConstructionComponent {
  private location = inject(Location);
  faArrowLeft = faArrowLeft;

  goBack() {
    this.location.back();
  }

}
