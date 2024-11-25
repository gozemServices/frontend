import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../../../services/cv/education.service';
import { Education } from '../../../../../core/models/cv-sections.model';

@Component({
  selector: 'app-edit-education',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss'],
})
export class EditEducationComponent implements OnInit {
  @Input() isVisible!: boolean;
  @Input() isEditMode: boolean = false;
  @Input() selectedEducation?: Education;
  @Output() closeModal = new EventEmitter<void>();
  @Output() educationUpdated = new EventEmitter<void>();
  educationForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private educationService: EducationService
  ) {}

  ngOnInit() {
    this.initForm(this.selectedEducation);
  }

  initForm(data: any) {
    // console.log(data ?? 'nothing here');
    this.educationForm = this.fb.group({
      startDate: [data?.startDate || '', Validators.required],
      endDate: [data?.endDate || '', Validators.required],
      town: [data?.town || '', [Validators.required, Validators.minLength(2)]],
      diplomaName: [
        data?.diplomaName || '',
        [Validators.required, Validators.minLength(3)],
      ],
      institution: [
        data?.institution || '',
        [Validators.required, Validators.minLength(3)],
      ],
      description: [data?.description || '', Validators.maxLength(500)],
    });
  }

  onSubmit() {
    if (this.educationForm.valid) {
      const educationData = this.educationForm.value;
      const educationId = this.selectedEducation?.id;
      if (this.isEditMode && educationId) {
        this.educationService.updateEducation(educationId, educationData).subscribe(
          (updatedData) => {
            // console.log('Education updated:', updatedData);
            this.educationForm.reset();
            this.closeModal.emit();
            this.educationUpdated.emit();
          },
          (error) => {
            console.error('Error updating education:', error);
          }
        );
      } else {
        this.educationService.addEducation(educationData).subscribe(
          (newData) => {
            // console.log('New education created:', newData);
            this.closeModal.emit();
            this.educationUpdated.emit();
          },
          (error) => {
            console.error('Error creating education:', error);
          }
        );
      }
    }
  }

  onCancel() {
    this.educationForm.reset();
    this.closeModal.emit();
  }
}
