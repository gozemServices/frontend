import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faEdit, faExclamationTriangle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { EditExperienceComponent } from '../actions/edit-experience/edit-experience.component';
import { ExperienceService } from '../../../services/cv/experience.service';
import { GenericService } from '../../../../core/services/generic.service';
import { Experience } from '../../../../core/models/cv-sections.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    FontAwesomeModule,
    EditExperienceComponent,
  ],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  @Input() experienceList: any[] = [];

  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;
  faDanger = faExclamationTriangle;
  cvId!: number;
  isEditVisible = false;
  selectedExperience: any = null;
  isEditMode = false;
  loading = true;
  confirmDeletion = true;
  isConfirmationModalOpened = false;
  itemToDelete: number | null = null;

  constructor(private experienceService: ExperienceService, private genericsService: GenericService) {}

  ngOnInit() {
    this.cvId = this.genericsService.getCvDatas().cv.id;
    this.getExperienceList();
  }

  getExperienceList() {
    this.experienceService.getExperienceList().subscribe(
      (data) => {
        this.experienceList = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching experience data:', error);
      }
    );
  }

  addExperience() {
    this.selectedExperience = null;
    this.isEditVisible = true;
    this.isEditMode = false;
  }

  editExperience(experience: Experience) {
    this.selectedExperience = experience;
    this.isEditVisible = true;
    this.isEditMode = true;
  }

  deleteExperience(experienceId: number) {
    this.confirmDeletion = true;
    this.isConfirmationModalOpened = true;
    this.itemToDelete = experienceId;
  }

  effectiveDeleteExperience(action: boolean) {
    const experienceId = this.itemToDelete;
    if (action === true) {
      this.experienceService.deleteExperience(experienceId ?? 0).subscribe(
        () => {
          this.experienceList = this.experienceList.filter((ex) => ex.id !== experienceId);
          this.isConfirmationModalOpened = false;
          this.itemToDelete = null;
          this.refreshExperienceList();
        },
        (error: any) => {
          console.error('Error deleting experience:', error);
        }
      );
    } else {
      this.itemToDelete = null;
      this.isConfirmationModalOpened = false;
    }
  }

  onModalClose() {
    this.isEditVisible = false;
    this.refreshExperienceList();
  }

  refreshExperienceList() {
    this.getExperienceList();
  }
}
