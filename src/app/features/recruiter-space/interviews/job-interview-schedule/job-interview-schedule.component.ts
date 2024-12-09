import { Component, inject, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faAdd, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { CommonModule } from '@angular/common';
import { GenericService } from '../../../../core/services/generic.service';

@Component({
  selector: 'app-job-interview-schedule',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './job-interview-schedule.component.html',
  styleUrls: ['./job-interview-schedule.component.scss']
})
export class JobInterviewScheduleComponent {
  scheduleForm!: FormGroup;
  faAdd = faAdd;
  faRemove = faDeleteLeft;
  @Input() isEditMode: boolean = false;
  @Input() candidatesList: number[] = [];
  @Input() selectedCandidate: any  = null;
  private fb = inject(FormBuilder);
  private genericsService = inject(GenericService);

  constructor() {
    if(this.isEditMode && this.selectedCandidate != null) {
      this.initScheduleForm(this.selectedCandidate);
    }
    else if(this.isEditMode === false && this.candidatesList && this.candidatesList.length > 0) {
      this.initScheduleForm();
    }
    else {
      this.initScheduleForm();
    }

  }

  initScheduleForm(data?: any) {
    this.scheduleForm = this.fb.group({
      jobTitle: [data?.jobTitle || '', [Validators.required]],
      steps: this.fb.array(
        data?.steps?.length > 0
          ? data.steps.map((step: any) =>
              this.fb.group({
                name: [step.name, [Validators.required]],
                date: [step.date, [Validators.required]],
                time: [step.time, [Validators.required]],  // New field for time
                place: [step.place, [Validators.required]], // New field for place
                description: [step.description || ''],
                interviewerEmail: [step.interviewerEmail || '', [Validators.required]]
              })
            )
          : [this.createStep()],
        [Validators.required]
      )
    });
  }

  get steps(): FormArray {
    return this.scheduleForm.get('steps') as FormArray;
  }

  createStep() {
    return this.fb.group({
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],  // Time field
      place: ['', [Validators.required]], // Place field
      description: [''],
      interviewerEmail: ['', [Validators.required, Validators.email]]
    });
  }

  addStep() {
    this.steps.push(this.createStep());
  }

  removeStep(index: number) {
    if (this.steps.length > 1) {
      this.steps.removeAt(index);
    } else {
      alert('At least one step is required.');
    }
  }

  submitForm() {
    if (this.scheduleForm.valid) {
      console.log('Form Data:', this.scheduleForm.value);
    } else {
      console.log(this.genericsService.getFormValidationErrors(this.scheduleForm));
    }
  }

  onClose() {
    // Logic for closing the modal or clearing the form
  }
}
