import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { JobOffer } from '../../../../core/models/jobs.models';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,TranslateModule],
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.scss'
})
export class AddOfferComponent {
  offerForm!: FormGroup;
  @Input() isVisible = false;
  @Input() title = 'Modal Title';
  @Input() data: any ;
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder
  ) {
      this.initForm(this.data);
  }
  initForm(data: any) {
    this.offerForm = this.fb.group({
      title: [data?.title || '', [Validators.required]],
      description: [data?.description || '', [Validators.required,Validators.minLength(25)]],
      location: [data?.location || '', [Validators.required]],
      salary: [data?.salary || '', [Validators.required, Validators.min(1)]],
      status: [data?.active ?? true],
      city: [data?.city ?? true],
      type: [data?.type || 'remote', Validators.required] 
    });
  }
  saveOffer() {
    if (this.offerForm.invalid) {return;}
    const result: JobOffer = {
      ...this.offerForm.value,
      id: this.data?.id || 0,  
      postingDate: new Date() 
    };
  }
  onModalConfirmed() {
    console.log('Action confirmed');
  }

  closeDialog() {
    this.isVisible = false;
    this.closed.emit();
  }
}