
import { Component, inject,} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-job-apply',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, FormsModule],
  templateUrl: './job-apply.component.html',
  styleUrl: './job-apply.component.scss'
})
export class JobApplyComponent {

  faAdd = faAdd;
  faRemove = faRemove;

  jobApplicationForm: FormGroup;
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  constructor() {
    this.jobApplicationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // phone: ['', Validators.required],
      specialSkills: this.fb.array([])
    });
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

  onSubmit(): void {
    if (this.jobApplicationForm.valid) {
      console.log('Application Submitted:', this.jobApplicationForm.value);
    } else {
      console.log('Form is invalid');
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
