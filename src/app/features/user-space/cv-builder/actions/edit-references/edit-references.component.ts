import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoadingComponent } from '../../../../../shared/components/loading/loading.component';
import { Reference } from '../../../../../core/models/cv-sections.model';
import { ReferencesService } from '../../../../services/cv/references.service';

@Component({
  selector: 'app-edit-references',
  standalone: true,
  imports: [LoadingComponent, ReactiveFormsModule],
  templateUrl: './edit-references.component.html',
  styleUrl: './edit-references.component.scss'
})
export class EditReferencesComponent {
  @Input() isVisible!: boolean;
  @Input() isEditMode!: boolean;
  @Input() selectedReference?: Reference;
  @Output() closeModal = new EventEmitter<void>();
  @Output() referenceUpdated = new EventEmitter<void>();

  referenceForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private referencesService: ReferencesService
  ) {}

  ngOnInit() {
    this.initForm(this.selectedReference);
  }

  initForm(data: any) {
    console.log(this.selectedReference);
    this.referenceForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      contactInfo: [data?.contactInfo || '', [Validators.required, Validators.pattern('^[0-9]+$')]],
      relation: [data?.relation || '', Validators.required],
    });
  }

  onSubmit() {
    if (this.referenceForm.valid) {
      const referenceData = this.referenceForm.value;
      this.isLoading = true;

      if (this.isEditMode) {
        this.referencesService.updateReference(this.selectedReference?.id ?? 0, referenceData).subscribe(
          (updatedData: any) => {
            console.log('Reference updated:', updatedData);
            this.closeModal.emit();
          },
          (error: any) => {
            console.error('Error updating reference:', error);
          }
        );
      } else {
        this.referencesService.addReference(referenceData).subscribe(
          (newData: any) => {
            console.log('New reference added:', newData);
            this.closeModal.emit();
          },
          (error: any) => {
            console.error('Error adding reference:', error);
          }
        );
      }
    }
  }

  onCancel() {
    this.closeModal.emit();
  }
}
