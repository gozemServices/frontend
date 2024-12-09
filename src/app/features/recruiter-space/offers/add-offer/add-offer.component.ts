import {Component,inject,OnInit} from '@angular/core';
import {FormBuilder,FormArray,FormControl,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import {JobOffer,EmploymentType,JobOfferStatus,WorkLocation,} from '../../../../core/models/jobs.models';

import { TranslateModule } from '@ngx-translate/core';
import { faAdd, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecruiterService } from '../../../services/recruiter.service';
import { GenericService } from '../../../../core/services/generic.service';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { Toast } from '../../../../core/models/common.model';

@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit{

  faAdd = faAdd;
  faRemove = faDeleteLeft;
  selectedOffer!: JobOffer;
  isLoading = false;
  offerForm!: FormGroup;
  isEditMode!: boolean;

  employmentTypes = Object.values(EmploymentType);
  statuses = Object.values(JobOfferStatus);
  workLocations = Object.values(WorkLocation); 

  private fb = inject(FormBuilder);
  private offersServices = inject(RecruiterService);
  private genericsService = inject(GenericService);
  private modalService = inject(ModalService);
  constructor() {}

  ngOnInit(): void {
    // console.log(this.selectedOffer ?? 'no data addded');
    this.initForm(this.selectedOffer);  
  }

  initForm(data: any) {
    this.offerForm = this.fb.group({
      title: [data?.title || '', [Validators.required]],
      description: [data?.description || '', [Validators.required, Validators.minLength(25)]],
      salary: [data?.salary || '', [Validators.required]],
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



  onSubmit() {
    if (this.offerForm.invalid) {
      // const errors = this.genericsSerice.getFormValidationErrors(this.offerForm);
      // console.log("Form Submission Failed. Validation Issues:", errors);
      return;
    }
    if (this.offerForm.valid) {
      const toastInfos : Toast =  {
        id: 0,
        message: '',
        type: 'success',
        timeout: 1000
      }
      const offerData = this.offerForm.value;
      const offerId = this.selectedOffer?.id ?? 0;
      this.isLoading = true;
      console.log(offerData);
      if (this.isEditMode) {
        this.offersServices.updateJob(offerId, offerData).subscribe({
          next: () => {
            this.isLoading = false;
            toastInfos.message = 'Job proposal updated with success';
            this.genericsService.openToast(toastInfos);
            setTimeout(() => {
              this.modalService.close(true);
            }, 1050);
          },
          error: (error) => {
            toastInfos.message = 'Error updating that offer! please try again ';
            toastInfos.type = 'error';
            this.genericsService.openToast(toastInfos);
            // console.error('Error updating Job offer:', error);
          }
        });
      } else {
        this.offersServices.createJob(offerData).subscribe({
          next: (data) => {
            toastInfos.message = 'Job proposal created with success';
            this.genericsService.openToast(toastInfos);
            setTimeout(() => {
              this.modalService.close(true);
            }, 1050);
            // console.log(data)
          },
          error: (error) => {
            toastInfos.message = 'Error adding a new offer! please try again ';
            toastInfos.type = 'error';
            this.genericsService.openToast(toastInfos);
            console.error('Error adding offer:', error);
          }
        });
      }
    }
  }


  onClose() {
    this.modalService.close();
  }
  
}
