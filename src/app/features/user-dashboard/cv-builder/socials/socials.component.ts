import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [MatIconModule,FontAwesomeModule],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss'
})
export class SocialsComponent {
  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGithub = faGithub;
}
