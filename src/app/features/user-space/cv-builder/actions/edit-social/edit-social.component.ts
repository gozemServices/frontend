import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SocialsService } from '../../../../services/cv/socials.service';

@Component({
  selector: 'app-edit-social',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-social.component.html',
  styleUrl: './edit-social.component.scss'
})
export class EditSocialComponent {
  socialsForm!: FormGroup;
  @Input() isVisible!: boolean;
  @Input() isEditMode: boolean = false;
  @Input() socialData?: any;
  @Output() closeModal = new EventEmitter<void>();

  socialForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private socialsService: SocialsService
  ) {}

  ngOnInit() {
    this.initForm(this.socialData);
  }

  initForm(data: any) {
    this.socialForm = this.fb.group({
      name: [data?.name || '', Validators.required],
    });
  }

  onSubmit() {
    if (this.socialForm.valid) {
      const socialData = this.socialForm.value;
      this.isLoading = true;

      if (this.isEditMode) {
        this.socialsService.updateSocial(this.socialData?.id, socialData).subscribe(
          (updatedData: any) => {
            console.log('Social updated:', updatedData);
            this.closeModal.emit();
          },
          (error: any) => {
            console.error('Error updating social:', error);
          }
        );
      } else {
        this.socialsService.addSocial(socialData).subscribe(
          (newData: any) => {
            console.log('New social added:', newData);
            this.closeModal.emit();
          },
          (error: any) => {
            console.error('Error adding social:', error);
          }
        );
      }
    }
  }

  onCancel() {
    this.closeModal.emit();
  }
}
