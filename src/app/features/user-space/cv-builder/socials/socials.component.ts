import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faEdit, faExclamationTriangle, faTrash} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Social } from '../../../../core/models/cv-sections.model';
import { EditSocialComponent } from "../actions/edit-social/edit-social.component";
import { SocialService } from '../../../services/cv/socials.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [TranslateModule,CommonModule, FontAwesomeModule, EditSocialComponent],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss'
})
export class SocialsComponent implements OnInit{
  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGithub = faGithub;
  faDanger = faExclamationTriangle;
  @Input() cvId!: number;

  isAddModalVisible = false;
  isEditVisible = false;
  selectedSocial: any = null;
  isEditMode = false;
  loading = true;
  confirmDeletion = true;
  isConfirmationModalOpened = false;
  itemToDelete: number | null = null;
  @Input() socialList: Social[] = [];
  systemSocialList: any;

  constructor(private socialService: SocialService){}
  ngOnInit(): void {
      this.getSocialsList();
  }
  getSocialsList() {
    this.loading = true;
    this.socialService.getSocialLinks().subscribe(
      (data) => {
        this.socialList = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching socials data:', error);
        this.loading = false;
      }
    );
  }

  getAllSocials() {
    this.loading = true;
    this.socialService.getAllSocialsLinks().subscribe(
      (data) => {
        this.systemSocialList = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching socials data:', error);
        this.loading = false;
      }
    );
  }
  
  addSocial() {
    this.selectedSocial = null;
    this.isEditVisible = true; 
    this.isEditMode = false;
  }

  editSocial(social: any) {    
    this.selectedSocial = social;
    this.isEditVisible = true;
    this.isEditMode  = true;
  }
  deleteSocial(socialId: number) {
    this.confirmDeletion = true;
    this.isConfirmationModalOpened = true;
    this.itemToDelete = socialId;
  }
  effectiveDeleteSocial(action: boolean) {
    const socialId = this.itemToDelete;
    if(action === true) {
      this.socialService.deleteSocialLink(socialId ?? 0).subscribe(
        () => {
          this.socialList = this.socialList.filter((sol) => sol.id !== socialId);
          this.isConfirmationModalOpened = false;
          this.itemToDelete = null;
          this.refreshSocialList();
        },
        (error: any) => {
          console.error('Error deleting social:', error);
        }
      );
    } else {
      this.itemToDelete = null;
      this.isConfirmationModalOpened = false
    }
   
  } 

  onModalClose() {
    this.isEditVisible = false; 
    this.refreshSocialList();
  }

  refreshSocialList() {
    this.getSocialsList();
  }
}
