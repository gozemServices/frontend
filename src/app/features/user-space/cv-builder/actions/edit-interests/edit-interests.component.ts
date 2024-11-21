import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InterestsService } from '../../../../services/cv/interests.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-interests',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-interests.component.html',
  styleUrl: './edit-interests.component.scss'
})
export class EditInterestsComponent {
  // private interestsService = Inject(InterestsService);

  @Input() isVisible!: boolean;
  @Input() isEditMode: boolean = false;
  @Input() interestData?: any;
  @Output() closeModal = new EventEmitter<void>();
  interestForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,private interestsService: InterestsService) {}

  ngOnInit() {
    this.initForm(this.interestData);
  }

  initForm(data: any) {
    this.interestForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      description: [data?.description || '', Validators.maxLength(500)],
    });
  }

  onSubmit() {
    if (this.interestForm.valid) {
      const interestData = this.interestForm.value;
      this.isLoading = true;

      if (this.isEditMode) {
        this.interestsService.updateInterest(interestData.id, interestData).subscribe(
          (updatedData: any) => {
            console.log('Interest updated:', updatedData);
            this.closeModal.emit();
          },
          (error: any) => {
            console.error('Error updating interest:', error);
          }
        );
      } else {
        this.interestsService.addInterest(interestData).subscribe(
          (newData: any) => {
            console.log('New interest added:', newData);
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
  }

}
