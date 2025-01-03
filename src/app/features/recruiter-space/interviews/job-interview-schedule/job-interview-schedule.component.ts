import { Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faAdd, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalService } from '../../../../shared/components/modal/modal.service';

import { GenericService } from '../../../../core/services/generic.service';
import { InterviewService } from '../../../services/interview.service';
import { Toast } from '../../../../core/models/common.model';

@Component({
  selector: 'app-job-interview-schedule',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './job-interview-schedule.component.html',
  styleUrls: ['./job-interview-schedule.component.scss']
})
export class JobInterviewScheduleComponent implements OnInit {
  scheduleForm!: FormGroup;
  faAdd = faAdd;
  faRemove = faDeleteLeft;
  @Input() isEditMode: boolean = false;
  @Input() selectedCandidate: any  = null;
  @Input() jobOfferId: number | null = null;

  private fb = inject(FormBuilder);
  private genericService = inject(GenericService);
  private interviewService = inject(InterviewService);
  candidatesList$ = this.interviewService.candidatesList;
  isloading = false;
  
  constructor() {}
  ngOnInit() {
    if(this.isEditMode && this.selectedCandidate != null) {
      this.initScheduleForm(this.selectedCandidate);
    }
    else if(this.isEditMode === false && this.candidatesList$ && this.candidatesList$.length > 0) {
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
                interviewerEmails: [step.interviewerEmails || '', [Validators.required]]
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
      interviewerEmails: ['', [Validators.required]]
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
      const toastInfos: Toast = {
        id: 0,
        message: '',
        type: 'success',
        timeout: 1000,
      }
      const GroupInterviewScheduleDTO = {
        jobOfferId: this.jobOfferId,
        steps: this.scheduleForm.value.steps,
        jobApplicationIds: this.interviewService.candidatesList(),
      }
      console.log(GroupInterviewScheduleDTO);
      this.isloading = true;
      // Using InterviewScheduleService to save the schedule
      this.interviewService.createOrUpdateSchedule(GroupInterviewScheduleDTO).subscribe({
        next: (response) => {
          toastInfos.message = 'Interview schedule updated sucessfully';
          this.genericService.openToast(toastInfos);
          console.log('Interview schedule saved successfully:', response);
        },
        error: (error) => {
          toastInfos.type = 'error'
          toastInfos.message = 'Interview schedule updated sucessfully';
          this.genericService.openToast(toastInfos);
          console.error('Error saving interview schedule:', error);
        }
      });
    } else {
      console.log(this.genericService.getFormValidationErrors(this.scheduleForm));
    }
  }

  onClose() {
    // Logic for closing the modal or clearing the form
  }
}
