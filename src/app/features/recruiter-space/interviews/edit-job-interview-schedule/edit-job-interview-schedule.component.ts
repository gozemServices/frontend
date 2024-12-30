import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { InterviewService } from '../../../services/interview.service';

@Component({
  selector: 'app-edit-job-interview-schedule',
  standalone: true,
  imports: [FontAwesomeModule,ReactiveFormsModule],
  templateUrl: './edit-job-interview-schedule.component.html',
  styleUrl: './edit-job-interview-schedule.component.scss'
})
export class EditJobInterviewScheduleComponent {
  scheduleForm!: FormGroup;
  faAdd = faAdd;
  faRemove = faDeleteLeft;
  data: any;
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  // private genericsService = inject(GenericService);
  private interviewService = inject(InterviewService);
  isloading = false;
  
  constructor() {}
  ngOnInit() {
    this.initScheduleForm(this.data.interviewDetails);
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
    // console.log(this.scheduleForm.value);
    // console.log(this.data);
    if (this.scheduleForm.valid) {
      const groupId = this.data.interviewDetails.id;
      const InterviewGroupDTO = {
        id : groupId,
        date: this.data.interviewDetails.date,
        jobSeekers: this.data.interviewDetails.jobSeekers,
        steps: this.scheduleForm.value.steps
      };
      this.isloading = true;
      // Using InterviewScheduleService to save the schedule
      this.interviewService.createOrUpdateSchedule(InterviewGroupDTO).subscribe({
        next: (response) => {
          console.log('Interview schedule saved successfully:', response);
        },
        error: (error) => {
          console.error('Error saving interview schedule:', error);
        }
      });
    } else {
      // console.log(this.genericsService.getFormValidationErrors(this.scheduleForm));
    // }
  }
}

  onClose() {
    this.modalService.close();
  }
}
