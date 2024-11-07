import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { DialogMessageComponent } from '../../../../shared/components/dialog-message/dialog-message.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'; 
@Component({
  selector: 'app-job-apply',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FontAwesomeModule],
  templateUrl: './job-apply.component.html',
  styleUrl: './job-apply.component.scss'
})
export class JobApplyComponent {
  jobApplyForm: FormGroup;
  faPlusCircle = faPlusCircle;
  faTimesCircle = faTimesCircle;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<JobApplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {jobId?: string }
  ) {
    this.jobApplyForm = this.fb.group({
      specialSkills: this.fb.array([this.createSkillField()])
    });
  }

  ngOnInit(): void {}

  
  createSkillField(): FormGroup {
    return this.fb.group({
      skill: ['', Validators.required]
    });
  }

  get specialSkills(): FormArray {
    return this.jobApplyForm.get('specialSkills') as FormArray;
  }

  addSkill(): void {
    this.specialSkills.push(this.createSkillField());
  }

  removeSkill(index: number): void {
    this.specialSkills.removeAt(index);
  }

  onSubmit(): void {
    if (this.jobApplyForm.valid) {
      // Show success message
      this.openDialog('Success', 'Your application has been submitted successfully!');
    } else {
      this.openDialog('Error', 'Please fill out all required fields!');
    }
  }

  openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: { title, message } 
    });
  
    // Handle the dialog result when it is closed
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Dialog closed with result:', result);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
