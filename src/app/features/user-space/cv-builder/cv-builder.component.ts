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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditEducationComponent } from './actions/edit-education/edit-education.component';
import { Education, Experience, Social } from '../../../core/models/cv-sections.model';
import { EditExperienceComponent } from './actions/edit-experience/edit-experience.component';
import { EditSocialComponent } from './actions/edit-social/edit-social.component';
import { ReferencesComponent } from "./references/references.component";
import { GenericService } from '../../../core/services/generic.service';


@Component({
  selector: 'app-cv-builder',
  standalone: true,
  imports: [CommonModule, MatDialogModule, RouterModule, BasicInfosComponent, GeneralInfosComponent, EducationComponent, ExperienceComponent, SkillsComponent, InterestsComponent, SocialsComponent, ReferencesComponent],
  templateUrl: './cv-builder.component.html',
  styleUrls: ['./cv-builder.component.scss']
})
export class CvBuilderComponent implements OnInit {
  currentCvSection: { title: string, anchor: string };
  iscvSectionListShown: boolean = false;
  cvId: any;
  cvSections = [
    { title: 'BASIC_INFOS', anchor: 'basic_infos' },
    { title: 'GENERAL_INFOS', anchor: 'general_infos' },
    { title: 'EDUCATION', anchor: 'education' },
    { title: 'EXPERIENCE', anchor: 'experience' },
    { title: 'SKILLS', anchor: 'skills' },
    { title: 'INTERESTS', anchor: 'interests' },
    { title: 'SOCIALS', anchor: 'socials' }
  ];

  isLoading = false;

  constructor(private cvService: GenericService) {
    this.currentCvSection = this.cvSections[0];
  }
  ngOnInit(): void {
      this.fetchCvInfos();
  }

  setCvSection(index: number) {
    this.currentCvSection = this.cvSections[index];
    this.iscvSectionListShown = false;
  }

  toggleShowCvSectionsList() {
    this.iscvSectionListShown = !this.iscvSectionListShown;
  }

  scrollToSection(anchor: string) {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  fetchCvInfos() {
    const cvDatas = this.cvService.getCvDatas().cv;
    // console.log(cvDatas);
    this.cvId = cvDatas.id;
  }
}
