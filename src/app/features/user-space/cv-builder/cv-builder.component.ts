import { Component, inject, OnInit } from '@angular/core';
import { GeneralInfosComponent } from "./general-infos/general-infos.component";
import { EducationComponent } from "./education/education.component";
import { ExperienceComponent } from "./experience/experience.component";
import { SkillsComponent } from "./skills/skills.component";
import { InterestsComponent } from "./interests/interests.component";
import { SocialsComponent } from "./socials/socials.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReferencesComponent } from "./references/references.component";
import { GenericService } from '../../../core/services/generic.service';
import { LanguagesComponent } from "./languages/languages.component";
import { TranslateModule } from '@ngx-translate/core';
import { faDownload, faEye, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CvTemplateComponent } from '../../../shared/components/cv-template/cv-template.component';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { CvthequeService } from '../../services/cv/cvtheque.service';

@Component({
  selector: 'app-cv-builder',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    TranslateModule,
    FontAwesomeModule,
    GeneralInfosComponent, 
    EducationComponent, 
    ExperienceComponent, 
    SkillsComponent, 
    InterestsComponent, 
    SocialsComponent, 
    ReferencesComponent, 
    LanguagesComponent,
  ],
  templateUrl: './cv-builder.component.html',
  styleUrls: ['./cv-builder.component.scss']
})
export class CvBuilderComponent implements OnInit {
  currentCvSection: { title: string, anchor: string };
  cvId: any;
  cvSections = [
    { title: 'BASIC_INFOS', anchor: 'basic_infos' },
    { title: 'GENERAL_INFOS', anchor: 'general_infos' },
    { title: 'EDUCATION', anchor: 'education' },
    { title: 'LANGUAGE', anchor: 'language' },
    { title: 'EXPERIENCE', anchor: 'experience' },
    { title: 'SKILLS', anchor: 'skills' },
    { title: 'INTERESTS', anchor: 'interests' },
    { title: 'SOCIALS', anchor: 'socials' }
  ];

  isLoading = false;
  faView = faUsersViewfinder;
  faview2 = faEye;
  faDownload = faDownload;
  cvInfos: any;
  private modalService = inject(ModalService);
  private genericsService =  inject(GenericService);
  private cvThequeServices = inject(CvthequeService);
  

  constructor() {
    this.currentCvSection = this.cvSections[0];
  }
  ngOnInit(): void {
      this.getCvInfos();
  }


  scrollToSection(index: number) {
    this.currentCvSection = this.cvSections[index];
    const element = document.getElementById(this.cvSections[index].anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // fetchCvInfos() {
  //   const cvDatas = this.genericsService.getCvDatas();
  //   // console.log(cvDatas);
  //   this.cvId = cvDatas.cv.id;
  //   // if (cvDatas) this.userData = cvDatas;
  //   console.log(this.userData);
  // }


  getCvInfos() {
    this.isLoading = true;
    this.genericsService.fetchCvInfos().subscribe(
      (data) => {
        let userData = data;
        if(userData) {
          this.cvInfos = userData;
          this.cvId = userData.cv.id;
          this.genericsService.saveCvDatas(this.cvInfos);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  downloadCv() {
    this.cvThequeServices.printCv(this.cvId).subscribe(
      (response: ArrayBuffer) => {
        // Convert ArrayBuffer to Blob
        const blob = new Blob([response], { type: 'application/pdf' });
  
        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(blob);
  
        // Create a link element to trigger the file download
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'cv.pdf';  // Set the file name
        a.click();  // Trigger the download
  
        // Clean up the URL object
        URL.revokeObjectURL(blobUrl);
  
        alert('CV is being downloaded!');
      },
      (error) => {
        console.error('Error downloading CV', error);
      }
    );
  }
  openCvTemplate() {
    // alert("opened");
    this.modalService.open(CvTemplateComponent, {
      size: {
        width: '80%',
        padding: '1rem'
      },
      data: {
        selectedCv: this.cvInfos,
      }
    }).then((data) => {

      });
  }
  
}
