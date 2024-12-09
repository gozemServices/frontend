import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguagesService } from '../../../../services/cv/languages.service';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-language',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './edit-language.component.html',
  styleUrls: ['./edit-language.component.scss'],
})
export class EditLanguageComponent {
  @Input() isVisible!: boolean;
  @Input() isEditMode: boolean = false;
  @Input() selectedLanguage: any = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() languageUpdated = new EventEmitter<void>();
  languageForm: FormGroup;

  constructor(private fb: FormBuilder, private languageService: LanguagesService) {
    this.languageForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
    });
  }

  ngOnChanges() {
    if (this.selectedLanguage) {
      this.languageForm.patchValue(this.selectedLanguage);
    }
  }

  onSubmit() {
    if (this.languageForm.valid) {
      const languageData = this.languageForm.value;
      if (this.isEditMode && this.selectedLanguage?.id) {
        this.languageService.updateLanguage(this.selectedLanguage.id, languageData).subscribe(
          () => this.closeModal.emit(),
          (error) => console.error('Error updating language:', error)
        );
      } else {
        this.languageService.addLanguage(languageData).subscribe(
          () => this.closeModal.emit(),
          (error) => console.error('Error adding language:', error)
        );
      }
    }
  }

  onCancel() {
    this.closeModal.emit();
  }
}
