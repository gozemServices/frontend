import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GenericService } from '../../../core/services/generic.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBriefcase, faCheckCircle, faCog, faEnvelope, faGears, faGraduationCap, faMapMarkerAlt, faPencilAlt, faPhone, faX } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModalService } from '../modal/modal.service';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-cv-template',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './cv-template.component.html',
  styleUrl: './cv-template.component.scss'
})
export class CvTemplateComponent implements OnInit{
  @ViewChild('cvContent', { static: false }) cvContent!: ElementRef;

  faEnvelope = faEnvelope;
  faMap = faMapMarkerAlt;
  faPhone = faPhone;
  faCheckCircle = faCheckCircle;
  faPencil = faPencilAlt;
  faGraducation = faGraduationCap;
  faBriefCase = faBriefcase; 
  faSkills = faGears
  faClose = faX;

  selectedCv: any;
  @Input() selectedc!: any;
  profilePic: string | ArrayBuffer | null = null;
  sanitizedIconSvg: any;
  sanitizedSocialIcons: { id: number; name: string; url: string; iconSvg: SafeHtml }[] = [];
  
  private genericsService = inject(GenericService); 
  private domSanitizer =  inject(DomSanitizer);
  private modalService = inject(ModalService); 
  
  constructor() {}
  ngOnInit(): void {
      this.loadProfileImage(this.selectedCv?.profilePhotoUrl);
      this.sanitizeSocialIcons();
      console.log(this.selectedCv.profilePhotoUrl);
      console.log(this.selectedCv);
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
    if (this.selectedCv?.cv?.social) {
      this.sanitizedSocialIcons = this.selectedCv.cv.social.map((social: any) => ({
        ...social,
        iconSvg: this.domSanitizer.bypassSecurityTrustHtml(social.iconSvg),
      }));
    }
  }

  oncloseTemplate() {
    this.modalService.close();
  }

  downloadPDF() {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const content = this.cvContent.nativeElement;

    pdf.html(content, {
      callback: (doc) => {
        doc.save('CV.pdf');
      },
      x: 10,
      y: 10,
      html2canvas: { scale: 0.8 }, // Adjust scaling for better fit
    });
  }
}
