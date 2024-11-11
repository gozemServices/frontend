import { Component, EventEmitter, Input, Output, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Education } from '../../../../../core/models/cv-sections.model';

@Component({
  selector: 'app-edit-education',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './edit-education.component.html',
  styleUrl: './edit-education.component.scss'
})
export class EditEducationComponent {
  educationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditEducationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEditMode: boolean; educationData?: Education }
  ) {
    this.initForm(data);
  }


  initForm(data: any) {
    this.educationForm = this.fb.group({
      startDate: [data.educationData?.startDate || '', Validators.required],
      endDate: [data.educationData?.endDate || '', Validators.required],
      town: [data.educationData?.town || '', Validators.required],
      diplomaName: [data.educationData?.diplomaName || '', Validators.required],
      school: [data.educationData?.school || '', Validators.required],
      description: [data.educationData?.description || ''],
    });
  }

  onSubmit() {
    if (this.educationForm.valid) {
      const educationData: Education = this.educationForm.value;
      this.dialogRef.close(educationData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
