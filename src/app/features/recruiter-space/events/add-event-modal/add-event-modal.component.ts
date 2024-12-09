
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Event } from '../../../../core/models/common.model';

@Component({
  selector: 'app-add-event-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-event-modal.component.html',
  styleUrl: './add-event-modal.component.scss'
})
export class AddEventModalComponent {
  eventForm: FormGroup;

  // Event type options
  eventTypes: string[] = ['Conference', 'Webinar', 'Workshop', 'Seminar'];
  
  // If data is provided, we are editing an event
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event | null
  ) {
    // Initialize the form with validation
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      eventType: ['', Validators.required],
      status: ['Upcoming']  // Default status for new events
    });

    // If there's an event data, we are editing the event
    if (this.data) {
      this.isEditMode = true;
      this.eventForm.patchValue(this.data);  // Populate the form with event data
    }
  }

  // Save the form (either create or edit event)
  saveEvent(): void {
    if (this.eventForm.invalid) {
      return; // Don't proceed if the form is invalid
    }

    const eventData = this.eventForm.value;

    // If it's an edit, pass the existing event ID
    const event: Event = this.isEditMode ? { ...eventData, id: this.data?.id } : { ...eventData, id: 0 };

    // Close the modal and pass the event data to the parent component
    this.dialogRef.close(event);
  }

  // Cancel the action and close the modal
  cancel(): void {
    this.dialogRef.close();
  }

}
