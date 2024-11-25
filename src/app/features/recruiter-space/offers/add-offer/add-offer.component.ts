import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  JobOffer,
  EmploymentType,
  JobOfferStatus,
  WorkLocation,
} from '../../../../core/models/jobs.models';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { faAdd, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent {

  faAdd = faAdd;
  faRemove = faDeleteLeft;
  offerForm!: FormGroup;

  @Input() isVisible = false;
  @Input() title = 'Modal Title';
  @Input() data: any;
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<JobOffer>();

  employmentTypes = Object.values(EmploymentType);
  statuses = Object.values(JobOfferStatus);
  workLocations = Object.values(WorkLocation);

  constructor(private fb: FormBuilder) {
    this.initForm(this.data);
  }

  initForm(data: any) {
    this.offerForm = this.fb.group({
      title: [data?.title || '', [Validators.required]],
      description: [data?.description || '', [Validators.required, Validators.minLength(25)]],
      salary: [data?.salary || '', [Validators.required, Validators.pattern(/^\d+$/)]],
      location: [data?.location || '', [Validators.required]],
      status: [data?.status || JobOfferStatus.ACTIVE, Validators.required],
      workLocation: [data?.workLocation || WorkLocation.REMOTE, Validators.required],
      company: [data?.company || '', Validators.required],
      employmentType: [data?.employmentType || null],
      benefits: this.fb.array((data?.benefits || []).map((benefit: string) => this.fb.control(benefit, Validators.required))),
      responsibilities: this.fb.array(
        (data?.responsibilities || []).map((responsibility: string) =>
          this.fb.control(responsibility, Validators.required)
        )
      ),
      applicationDeadline: [data?.applicationDeadline || null, Validators.required],
      contactEmail: [data?.contactEmail || '', [Validators.required, Validators.email]],
      requirements: this.fb.group({
        education: [data?.requirements?.education || '', Validators.required],
        experience: [data?.requirements?.experience || '', Validators.required],
        skills: this.fb.array(
          (data?.requirements?.skills || []).map((skill: string) =>
            this.fb.control(skill, Validators.required)
          )
        ),
      }),
    });
  }

  get benefits(): FormArray {
    return this.offerForm.get('benefits') as FormArray;
  }

  get responsibilities(): FormArray {
    return this.offerForm.get('responsibilities') as FormArray;
  }
  get requirements(): FormArray {
    return this.offerForm.get('requirements') as FormArray;
  }
  get skills(): FormArray {
    return this.offerForm.get('requirements.skills') as FormArray;
  }

  addItem(controlName: string) {
    // console.log(controlName);
    // console.log(this.offerForm.get(controlName));
    const formArray = this.offerForm.get(controlName) as FormArray;
    formArray.push(this.fb.control('',Validators.required));
  }

  removeItem(controlName: string, index: number) {
    (this.offerForm.get(controlName) as FormArray).removeAt(index);
  }

  saveOffer() {
    if (this.offerForm.invalid) {
      return;
    }
    this.confirmed.emit(this.offerForm.value);
  }

  closeDialog() {
    this.isVisible = false;
    this.closed.emit();
  }


  onSubmit() {
    alert('hefjod');
    console.log(this.offerForm.value);
  }
}
