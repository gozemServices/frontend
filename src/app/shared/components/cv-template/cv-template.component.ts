import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericService } from '../../../core/services/generic.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBriefcase, faCheckCircle, faCog, faEnvelope, faGears, faGraduationCap, faMapMarkerAlt, faPencilAlt, faPhone, faX } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-cv-template',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './cv-template.component.html',
  styleUrl: './cv-template.component.scss'
})
export class CvTemplateComponent implements OnInit{
  faEnvelope = faEnvelope;
  faMap = faMapMarkerAlt;
  faPhone = faPhone;
  faCheckCircle = faCheckCircle;
  faPencil = faPencilAlt;
  faGraducation = faGraduationCap;
  faBriefCase = faBriefcase; 
  faSkills = faGears
  faClose = faX;

  @Input() userData: any;
  @Input() isVisible = false;
  @Output() closeModal = new EventEmitter<void>();

  profilePic: string | ArrayBuffer | null = null;
  sanitizedIconSvg: any;
  sanitizedSocialIcons: { id: number; name: string; url: string; iconSvg: SafeHtml }[] = [];
  constructor(private genericsService: GenericService, private domSanitizer: DomSanitizer) {}
  ngOnInit(): void {
      this.loadProfileImage(this.userData?.profilePhotoUrl);
      this.sanitizeSocialIcons();
      console.log(this.userData.profilePhotoUrl);
      console.log(this.userData);
  }
  loadProfileImage(fileName: string) {
    this.genericsService.getImageRessource(fileName).subscribe(
      (data) => {
        // Convert the Blob to a URL and display it
        this.profilePic = URL.createObjectURL(data);
      },
      (error) => {
        console.error('Error fetching image', error);
        this.profilePic = null
      }
    );
  }

  sanitizeSocialIcons() {
    if (this.userData?.cv?.social) {
      this.sanitizedSocialIcons = this.userData.cv.social.map((social: any) => ({
        ...social,
        iconSvg: this.domSanitizer.bypassSecurityTrustHtml(social.iconSvg),
      }));
    }
  }

  oncloseTemplate() {
    this.closeModal.emit();
  }

}
