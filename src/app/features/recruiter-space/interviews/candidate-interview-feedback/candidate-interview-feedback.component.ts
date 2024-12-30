import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ModalService } from '../../../../shared/components/modal/modal.service';
import { InterviewService } from '../../../services/interview.service';
import { Toast } from '../../../../core/models/common.model';
import { GenericService } from '../../../../core/services/generic.service';

@Component({
  selector: 'app-candidate-interview-feedback',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './candidate-interview-feedback.component.html',
  styleUrl: './candidate-interview-feedback.component.scss'
})
export class CandidateInterviewFeedbackComponent implements OnInit {
  candidateForm!: FormGroup;
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  private interviewService = inject(InterviewService);
  private genericService = inject(GenericService);
  loading = false;
  jobApplicationId: any;
  constructor() {
    this.initCandidateForm();
  }

  ngOnInit() {
    console.log(this.jobApplicationId);
  }
  initCandidateForm() {
    this.candidateForm = this.fb.group({
      comment: ['', [Validators.required]],
      score: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      status: ['', [Validators.required]],
      additionalNotes: ['']
    });
  }

  submitForm() {
    if (this.candidateForm.valid) {
      const addNoteDto = {
        jobApplicationId: this.jobApplicationId,
        score: this.candidateForm.value.score,
        status: this.candidateForm.value.status,
        comment: this.candidateForm.value.comment
      }
      console.log(addNoteDto);
      const toastInfos: Toast = {
        id: 0,
        message: '',
        type: 'success',
        timeout: 1000,
      }
      this.loading = true;
      this.interviewService.AddJobInterviewNote(addNoteDto).subscribe({
        next: (response) => {
          toastInfos.message = 'Interview schedule updated sucessfully';
          this.genericService.openToast(toastInfos);
          this.loading = false;
        },
        error: (error) => {
          toastInfos.message = 'Error saving interview schedule';
          toastInfos.type = 'error';
          this.genericService.openToast(toastInfos);
          this.loading = false;
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  onClose() {
    this.modalService.close();
  }
}
