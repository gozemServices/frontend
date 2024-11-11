import { Component, EventEmitter, Input, Output, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Experience } from '../../../../../core/models/cv-sections.model';  // assuming you have this model

@Component({
  selector: 'app-edit-experience',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss']
})
export class EditExperienceComponent {
  experienceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditExperienceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEditMode: boolean; experienceData?: Experience }
  ) {
    this.initForm(data);
  }

  initForm(data: any) {
    this.experienceForm = this.fb.group({
      startDate: [data.experienceData?.startDate || '', Validators.required],
      endDate: [data.experienceData?.endDate || '', Validators.required],
      town: [data.experienceData?.town || '', Validators.required],
      jobTitle: [data.experienceData?.jobTitle || '', Validators.required],
      companyName: [data.experienceData?.companyName || '', Validators.required],
      description: [data.experienceData?.description || ''],
    });
  }

  onSubmit() {
    if (this.experienceForm.valid) {
      const experienceData: Experience = this.experienceForm.value;
      this.dialogRef.close(experienceData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
