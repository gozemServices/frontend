import { Component, OnInit } from '@angular/core';
import { BasicInfosComponent } from "./basic-infos/basic-infos.component";
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
    CvTemplateComponent
  ],
  templateUrl: './cv-builder.component.html',
  styleUrls: ['./cv-builder.component.scss']
})
export class CvBuilderComponent implements OnInit {
  currentCvSection: { title: string, anchor: string };
  isPrevisualized = false;
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
  userData: any;
  

  constructor(private genericsService: GenericService) {
    this.currentCvSection = this.cvSections[0];
  }
  ngOnInit(): void {
      // this.fetchCvInfos();
      this.getCvInfos();
  }


  scrollToSection(index: number) {
    this.currentCvSection = this.cvSections[index];
    const element = document.getElementById(this.cvSections[index].anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  fetchCvInfos() {
    const cvDatas = this.genericsService.getCvDatas();
    // console.log(cvDatas);
    this.cvId = cvDatas.cv.id;
    // if (cvDatas) this.userData = cvDatas;
    console.log(this.userData);
  }


  getCvInfos() {
    this.isLoading = true;
    this.genericsService.fetchCvInfos().subscribe(
      (data) => {
        let cvInfos = data;
        if(cvInfos) {
          this.userData = cvInfos;
          this.cvId = cvInfos.cv.id;
          this.genericsService.saveCvDatas(this.userData);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  togglePrevisualized() {
    this.getCvInfos();
    this.isPrevisualized = !this.isPrevisualized;
  }

  onCloseModal() {
    this.isPrevisualized = !this.isPrevisualized;
  }
  
}
