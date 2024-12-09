import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InterestsService } from '../../../../services/cv/interests.service';


@Component({
  selector: 'app-edit-interests',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-interests.component.html',
  styleUrl: './edit-interests.component.scss'
})
export class EditInterestsComponent {
  // private interestsService = Inject(InterestsService);

  @Input() isVisible!: boolean;
  @Input() isEditMode: boolean = false;
  @Input() selectedInterest?: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() interestUpdated = new EventEmitter<void>();
  interestForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,private interestsService: InterestsService) {}

  ngOnInit() {
    this.initForm(this.selectedInterest);
  }

  initForm(data: any) {
    this.interestForm = this.fb.group({
      interestName: [data?.interestName || '', Validators.required],
      description: [data?.description || '', Validators.maxLength(500)],
    });
  }

  onSubmit() {
    if (this.interestForm.valid) {
      const interestData = this.interestForm.value;
      const educationId = this.selectedInterest?.id;
      this.isLoading = true;

      if (this.isEditMode && educationId) {
        this.interestsService.updateInterest(educationId, interestData).subscribe(
          (updatedData: any) => {
            console.log('Interest updated:', updatedData);
            this.interestForm.reset();
            this.closeModal.emit();
            this.interestUpdated.emit();
          },
          (error: any) => {
            console.error('Error updating interest:', error);
          }
        );
      } else {
        this.interestsService.addInterest(interestData).subscribe(
          (newData: any) => {
            console.log('New interest added:', newData);
            this.interestUpdated.emit();
          this.closeModal.emit();
          },
          (error: any) => {
            console.error('Error adding interest:', error);
          }
        );
      }
    }
  }

  onCancel() {
    this.closeModal.emit();
    this.interestForm.reset();
  }

}
