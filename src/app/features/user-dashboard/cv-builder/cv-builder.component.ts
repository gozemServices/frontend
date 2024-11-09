import { Component } from '@angular/core';
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

@Component({
  selector: 'app-cv-builder',
  standalone: true,
  imports: [CommonModule,MatDialogModule, RouterModule, BasicInfosComponent, GeneralInfosComponent, EducationComponent, ExperienceComponent, SkillsComponent, InterestsComponent, SocialsComponent],
  templateUrl: './cv-builder.component.html',
  styleUrls: ['./cv-builder.component.scss']
})
export class CvBuilderComponent {
  currentCvSection: { title: string, anchor: string };
  iscvSectionListShown: boolean = false;
  educationList: Education[] = [];
  experienceList: Experience[] = [];
  socialList: Social[] = [];
  cvSections = [
    { title: 'BASIC_INFOS', anchor: 'basic_infos' },
    { title: 'GENERAL_INFOS', anchor: 'general_infos' },
    { title: 'EDUCATION', anchor: 'education' },
    { title: 'EXPERIENCE', anchor: 'experience' },
    { title: 'SKILLS', anchor: 'skills' },
    { title: 'INTERESTS', anchor: 'interests' },
    { title: 'SOCIALS', anchor: 'socials' }
  ];

  constructor(private dialog: MatDialog) {
    this.currentCvSection = this.cvSections[0];
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


//
  openAddEducationDialog() {
    const dialogRef = this.dialog.open(EditEducationComponent, {
      data: {
        isEditMode: false,
      },
      panelClass: 'no-radius-dialog',
    });

    dialogRef.afterClosed().subscribe((result: Education) => {
      if (result) {
        this.educationList.push(result); // Add new education to the list
      }
    });
  }

  openEditEducationModal(education: any) {
    const dialogRef = this.dialog.open(EditEducationComponent, {
      data: {
        isEditMode: true,
        educationData: education
      },
      panelClass: 'no-radius-dialog',
    });

    dialogRef.afterClosed().subscribe((result: Education) => {
      if (result) {
        // Update the existing education entry in the list
        const index = this.educationList.indexOf(education);
        if (index !== -1) {
          this.educationList[index] = result;
        }
      }
    });
  }


  openExperienceDialog(experience?: Experience) {
    const dialogRef = this.dialog.open(EditExperienceComponent, {
      data: { isEditMode: !!experience, experienceData: experience },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result (e.g., save or update the experience data)
        console.log('Experience data:', result);
      }
    });
  }







  openAddSocialDialog() {
    const dialogRef = this.dialog.open(EditSocialComponent, {
      data: { isEditMode: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.socialList.push(result);
      }
    });
  }

  openEditSocialModal(social: any) {
    const dialogRef = this.dialog.open(EditSocialComponent, {
      data: { isEditMode: true, socialsData: social }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Find and update the existing social profile in the list
        const index = this.socialList.findIndex(item => item.platformName === result.platformName);
        if (index !== -1) {
          this.socialList[index] = result;
        }
      }
    });
  }
}
