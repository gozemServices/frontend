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
import { Education } from '../../../core/models/cv-sections.model';

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



  openAddModal() {
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

  openEditModal(education: any) {
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
}
