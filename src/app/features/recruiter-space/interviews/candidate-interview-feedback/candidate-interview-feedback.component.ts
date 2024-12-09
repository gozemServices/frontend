import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../../shared/components/modal/modal.service';

@Component({
  selector: 'app-candidate-interview-feedback',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './candidate-interview-feedback.component.html',
  styleUrl: './candidate-interview-feedback.component.scss'
})
export class CandidateInterviewFeedbackComponent {
  candidateForm!: FormGroup;
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);

  constructor() {
    this.initCandidateForm();
  }

  initCandidateForm() {
    this.candidateForm = this.fb.group({
      feedback: ['', [Validators.required]],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      status: ['', [Validators.required]],
      additionalNotes: ['']
    });
  }

  submitForm() {
    if (this.candidateForm.valid) {
      console.log('Feedback Data:', this.candidateForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  onClose() {
    this.modalService.close();
  }
}
