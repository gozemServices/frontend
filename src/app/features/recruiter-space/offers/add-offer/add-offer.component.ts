import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { JobOffer } from '../../../../core/models/jobs.models';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select'; // If needed
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.scss'
})
export class AddOfferComponent {
  offerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddOfferComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: JobOffer,
    private fb: FormBuilder
  ) {
    this.offerForm = this.fb.group({
      title: [data?.title || '', [Validators.required]],
      company: [data?.company || '', [Validators.required]],
      location: [data?.location || '', [Validators.required]],
      salary: [data?.salary || '', [Validators.required, Validators.min(1)]],
      description: [data?.description || '', [Validators.required]],
      active: [data?.active ?? true]
    });
  }

  // Method to save the offer (either new or edited)
  saveOffer() {
    if (this.offerForm.invalid) {
      return; // Prevent save if form is invalid
    }

    const result: JobOffer = {
      ...this.offerForm.value,
      id: this.data?.id || 0,  // Use existing ID or create new if adding
      postingDate: new Date()  // Add posting date
    };

    this.dialogRef.close(result);  // Close dialog and pass the offer data back
  }

  // Method to close the dialog without saving
  closeDialog() {
    this.dialogRef.close();
  }
}