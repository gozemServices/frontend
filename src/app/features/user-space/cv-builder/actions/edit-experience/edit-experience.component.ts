import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../../../../services/cv/experience.service';
import { Experience } from '../../../../../core/models/cv-sections.model';

@Component({
  selector: 'app-edit-experience',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss'],
})
export class EditExperienceComponent implements OnInit {
  @Input() isVisible!: boolean;
  @Input() isEditMode: boolean = false;
  @Input() experienceData?: Experience;
  @Output() closeModal = new EventEmitter<void>();
  @Output() experienceUpdated = new EventEmitter<void>();

  experienceForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService
  ) {}

  ngOnInit() {
    this.initForm(this.experienceData);
  }

  initForm(data: any) {
    console.log(data ?? 'nothing here');
    this.experienceForm = this.fb.group({
      startDate: [data?.startDate || '', Validators.required],
      endDate: [data?.endDate || '', Validators.required],
      position: [data?.position || '', Validators.required],
      company: [data?.company || '', Validators.required],
      description: [data?.description || ''],
    });
  }

  onSubmit() {
    if (this.experienceForm.valid) {
      const experienceData = this.experienceForm.value;
      const experienceId = this.experienceData?.id;

      if (this.isEditMode && experienceId) {
        this.experienceService.updateExperience(experienceId, experienceData).subscribe(
          (updatedData) => {
            console.log('Experience updated:', updatedData);
            this.experienceForm.reset();
            this.closeModal.emit();
            this.experienceUpdated.emit();
          },
          (error) => {
            console.error('Error updating experience:', error);
          }
        );
      } else {
        this.experienceService.addExperience(experienceData).subscribe(
          (newData) => {
            console.log('New experience created:', newData);
            this.closeModal.emit();
            this.experienceUpdated.emit();
          },
          (error) => {
            console.error('Error creating experience:', error);
          }
        );
      }
    }
  }

  onCancel() {
    this.experienceForm.reset();
    this.closeModal.emit();
  }
}
