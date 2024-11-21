import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Social } from '../../../../core/models/cv-sections.model';
import { SocialsService } from '../../../services/cv/socials.service';
import { EditEducationComponent } from "../actions/edit-education/edit-education.component";
import { EditSocialComponent } from "../actions/edit-social/edit-social.component";
@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [MatIconModule, FontAwesomeModule, EditSocialComponent],
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
  @Input() cvId!: number;

  isAddModalVisible = false;

  constructor(private socialService: SocialsService){}

  @Input() socialList: Social[] = [];
  @Output() addSocial = new EventEmitter<void>();
  @Output() editSocial = new EventEmitter<any>();

  getSocialsList() {
    this.socialService.getSocialsList().subscribe(
      (data) => {
        this.socialList = data;
      },
      (error) => {
        console.error('Error fetching skills data:', error);
      }
    );
  }

  onModalClose() {
    this.isAddModalVisible = false;
  }
  onEdit(skill: any) {
    this.editSocial.emit(skill);
  }

  onAdd() {this.isAddModalVisible = true};

}
