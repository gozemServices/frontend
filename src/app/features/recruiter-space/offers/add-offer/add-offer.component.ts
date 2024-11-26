import {Component,EventEmitter,inject,Input,Output,} from '@angular/core';
import {FormBuilder,FormArray,FormControl,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import {JobOffer,EmploymentType,JobOfferStatus,WorkLocation,} from '../../../../core/models/jobs.models';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { faAdd, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecruiterService } from '../../../services/recruiter.service';
import { GenericService } from '../../../../core/services/generic.service';

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
  selectedOffer:any;
  isLoading = false;
  offerForm!: FormGroup;

  @Input() isVisible = false;
  @Input() isEditMode = false;
  @Input() title = 'Modal Title';
  @Input() offerData: any;
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<JobOffer>();


  employmentTypes = Object.values(EmploymentType);
  statuses = Object.values(JobOfferStatus);
  workLocations = Object.values(WorkLocation); 

  private fb = inject(FormBuilder);
  private offersServices = inject(RecruiterService);
  private genericsSerice = inject(GenericService);
  constructor() {
    this.initForm(this.offerData);
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
    const formArray = this.offerForm.get(controlName) as FormArray;
    formArray.push(this.fb.control('',Validators.required));
  }

  removeItem(controlName: string, index: number) {
    (this.offerForm.get(controlName) as FormArray).removeAt(index);
  }

  closeDialog() {
    this.isVisible = false;
    this.closed.emit();
  }


  onSubmit() {
    if (this.offerForm.invalid) {
      const errors = this.genericsSerice.getFormValidationErrors(this.offerForm);
      console.log("Form Submission Failed. Validation Issues:", errors);
      return;
    }
    if (this.offerForm.valid) {
      const offerData = this.offerForm.value;
      const offerId = this.selectedOffer?.id ?? 0;
      this.isLoading = true;

      if (this.isEditMode) {
        this.offersServices.updateJob(offerId, offerData).subscribe(
          () => {
            console.log('Social updated successfully');
            this.closed.emit();
          },
          (error) => {
            console.error('Error updating social:', error);
          }
        );
      } else {
        console.log('launching')
        this.offersServices.createJob(offerData).subscribe(
          (data) => {
            console.log('Social added successfully');
            console.log(data)
            this.closed.emit();
          },
          (error) => {
            console.error('Error adding social:', error);
          }
        );
      }
    }
  }






  getFormValidationErrors(formGroup: FormGroup | FormArray): any[] {
    const errors: any[] = [];
    
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
  
      if (control instanceof FormGroup || control instanceof FormArray) {
        errors.push(...this.getFormValidationErrors(control));
      } else if (control?.invalid) {
        errors.push({
          control: key,
          errors: control.errors,
          value: control.value,
        });
      }
    });
  
    return errors;
  }
  
}
