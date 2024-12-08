import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faAdd, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { dateRangeValidator } from '../../../../shared/validators/dateRangeValidator';

@Component({
  selector: 'app-job-interview-schedule',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FontAwesomeModule],
  templateUrl: './job-interview-schedule.component.html',
  styleUrl: './job-interview-schedule.component.scss'
})
export class JobInterviewScheduleComponent {
  scheduleForm: FormGroup;
  faAdd = faAdd;
  faRemove = faDeleteLeft;
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  constructor() {
    this.scheduleForm = this.fb.group({
      candidateName: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      interviewDate: ['', [Validators.required]],
      steps: this.fb.array([]),
    }, { validators: dateRangeValidator('startDate', 'interviewDate', true) },
  );
  }

  get steps(): FormArray {
    return this.scheduleForm.get('steps') as FormArray;
  }

  addStep() {
    const stepGroup = this.fb.group({
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      description: [''],
    });
    this.steps.push(stepGroup);
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  submitForm() {
    if (this.scheduleForm.valid) {
      console.log('Form Data:', this.scheduleForm.value);
      alert('Form submitted successfully!');
      this.scheduleForm.reset();
      while (this.steps.length) {
        this.steps.removeAt(0);
      }
    } else {
      alert('Please fill out all required fields.');
    }
  }

  onClose() {
    this.modalService.close();
  }
}
