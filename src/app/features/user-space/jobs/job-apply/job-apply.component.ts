
import { Component, inject, OnInit,} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';
import { JobService } from '../../../services/job.service';
import { Toast } from '../../../../core/models/common.model';
import { GenericService } from '../../../../core/services/generic.service';
@Component({
  selector: 'app-job-apply',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, FormsModule],
  templateUrl: './job-apply.component.html',
  styleUrl: './job-apply.component.scss'
})
export class JobApplyComponent implements OnInit{

  faAdd = faAdd;
  faRemove = faRemove;
  loading = false;
  selectedOffer: any;
  jobApplicationForm: FormGroup;
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  private jobService = inject(JobService);
  private genericService = inject(GenericService);

  constructor() {
    this.jobApplicationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialSkills: this.fb.array([])
    });
  }

  ngOnInit(): void {
    console.log(this.selectedOffer);
  }

  get specialSkills(): FormArray {
    return this.jobApplicationForm.get('specialSkills') as FormArray;
  }

  addSkill(): void {
    this.specialSkills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number): void {
    this.specialSkills.removeAt(index);
  }

  applyToJob(offerId: number, cv?: File, coverLetter?: File): void {
    const toastInfos: Toast = {
      id: 0,
      message: '',
      type: 'success',
      timeout: 1000,
    }
    this.loading = true;
    this.jobService.applyToJob(offerId, cv, coverLetter).subscribe({
      next: (response) => {
        toastInfos.message = 'You have successfully applied to the job';
        this.genericService.openToast(toastInfos);
        this.loading = false;
      },
      error: (error) => {
        toastInfos.message = 'Error applying to the job';
        toastInfos.type = 'error';
        this.genericService.openToast(toastInfos);
        this.loading = false;
      }
    });
  }
  onSubmit(): void {
    if (this.jobApplicationForm.valid) {
        this.applyToJob(this.selectedOffer);
    }
  }

  onClose() {
    this.modalService.close();
  }




  // faUpload = faUpload;
  // faTrash = faTrash;
  // selectedOffer!: number;
  // formData: any = {
  //   email: '',
  //   cv: null,
  //   picture: null,
  //   motivation_letter: null,
  // };

  // filePreview: any = {};

  // files = [
  //   { name: 'cv', label: 'CV', accept: '.pdf,.doc,.docx', isImage: false },
  //   { name: 'picture', label: 'Profile Picture', accept: 'image/*', isImage: true },
  //   { name: 'motivation_letter', label: 'Motivation Letter', accept: '.pdf,.doc,.docx', isImage: false },
  // ];
  // private sanitizer =  inject(DomSanitizer);
  // private modalService = inject(ModalService);
  // constructor() {}

  // triggerFileInput(fileKey: string): void {
  //   const fileInput = document.getElementById(fileKey) as HTMLInputElement;
  //   fileInput.click();
  // }

  // onFileChange(event: Event, fileKey: string): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     this.formData[fileKey] = input.files[0];

  //     // If the file is an image, create a preview
  //     if (this.files.find((file) => file.name === fileKey)?.isImage) {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         this.filePreview[fileKey] = this.sanitizer.bypassSecurityTrustUrl(e.target?.result as string);
  //       };
  //       reader.readAsDataURL(input.files[0]);
  //     }
  //   }
  // }

  // removeFile(fileKey: string): void {
  //   this.formData[fileKey] = null;
  //   this.filePreview[fileKey] = null;
  // }


}
