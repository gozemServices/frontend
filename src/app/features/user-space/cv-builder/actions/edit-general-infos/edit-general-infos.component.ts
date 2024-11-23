import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CVDetailRequest } from '../../../../../core/models/cv-sections.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeneralInfosService } from '../../../../services/cv/general-infos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-general-infos',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-general-infos.component.html',
  styleUrl: './edit-general-infos.component.scss'
})
export class EditGeneralInfosComponent {

  @Input() isEditVisible!: boolean;
  @Input() selectedGeneralInfo?: CVDetailRequest;
  @Output() closeModal = new EventEmitter<void>();
  @Output() generalInfosUpdated = new EventEmitter<void>();
  generalInfoForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfosService
  ) {}

  ngOnInit() {
    this.selectedGeneralInfo = this.generalInfoService.getCvGeneralInfos();
    if(this.selectedGeneralInfo){
      this.initForm(this.selectedGeneralInfo);
      // console.log(this.selectedGeneralInfo);
    }
  }

  initForm(data: any) {
    // console.log(data ?? 'No data to prefill');
    this.generalInfoForm = this.fb.group({
      userId: [data?.id || '', Validators.required],
      name: [data?.name || '', [Validators.required, Validators.minLength(2)]],
      surname: [data?.surname || '',[Validators.required, Validators.minLength(2)],],
      description: [data?.cv?.description || '', Validators.maxLength(500)],
      jobTitle: [data?.cv?.jobTitle || '',[Validators.required, Validators.minLength(3)],],
      birthdate: [data?.birthdate || '', Validators.required],
      phone: [data?.phone || '',[Validators.required, Validators.pattern(/^\d{9}$/)],],
    });
  }

  onSubmit() {
    // console.log('Form Validity:', this.generalInfoForm.valid); // Overall validity
    // console.log('Form Errors:', this.generalInfoForm.errors); // Check global errors if any
  
    // // Check individual controls
    // Object.keys(this.generalInfoForm.controls).forEach((key) => {
    //   const control = this.generalInfoForm.get(key);
    //   console.log(`${key} Valid:`, control?.valid);
    //   console.log(`${key} Errors:`, control?.errors);
    // });
    if (this.generalInfoForm.valid) {
      const generalInfoData = this.generalInfoForm.value;
        this.generalInfoService
          .updateGeneralInfo(generalInfoData)
          .subscribe(
            (updatedData) => {
              // console.log('General Info updated:', updatedData);
              this.closeModal.emit();
              this.generalInfosUpdated.emit();
            },
            (error) => {
              console.error('Error updating general info:', error);
            }
          );
    }
  }
  onCancel() {
    this.closeModal.emit();
  }

}
