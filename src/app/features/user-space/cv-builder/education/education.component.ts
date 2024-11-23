import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faEdit, faExclamationTriangle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { EditEducationComponent } from '../actions/edit-education/edit-education.component';
import { EducationService } from '../../../services/cv/education.service';
import { GenericService } from '../../../../core/services/generic.service';
import { Education } from '../../../../core/models/cv-sections.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    FontAwesomeModule,
    EditEducationComponent,
  ],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit{
  @Input() educationList: any[] = [];

  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;
  faDanger = faExclamationTriangle;

  cvId!: number;
  isEditVisible = false;
  selectedEducation: any = null;
  isEditMode = false;
  loading = true;
  confirmDeletion = true;
  isConfirmationModalOpened = false;
  itemToDelete: number | null = null;

  constructor(private educationService: EducationService,private genericsService: GenericService) {}
  ngOnInit() {
    this.getEducationList();
  }
  getEducationList() {
    this.loading = true;
    this.educationService.getEducationList().subscribe(
      (data) => {
        this.educationList = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching education data:', error);
        console.log(error);
      }
    );
  }

  addEducation() {
    this.selectedEducation = null;
    this.isEditVisible = true; 
    this.isEditMode = false;
  }

  editEducation(education: Education) {    
    this.selectedEducation = education;
    this.isEditVisible = true;
    this.isEditMode  = true;
  }
  deleteEducation(educationId: number) {
    this.confirmDeletion = true;
    this.isConfirmationModalOpened = true;
    this.itemToDelete = educationId;
  }

  effectiveDeleteEducation(action: boolean) {
      const educationId = this.itemToDelete;
      if(action === true) {
        this.educationService.deleteEducation(educationId ?? 0).subscribe(
          () => {
            this.educationList = this.educationList.filter((ed) => ed.id !== educationId);
            this.isConfirmationModalOpened = false;
            this.itemToDelete = null;
            this.refreshEducationList();
          },
          (error: any) => {
            console.error('Error deleting education:', error);
          }
        );
      } else {
        this.itemToDelete = null;
        this.isConfirmationModalOpened = false
      }
     
  }

  onModalClose() {
    this.isEditVisible = false; 
    this.refreshEducationList();
  }

  refreshEducationList() {
    this.getEducationList();
  }
}
