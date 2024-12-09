import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SocialService } from '../../../../services/cv/socials.service';
import { Social } from '../../../../../core/models/cv-sections.model';


@Component({
  selector: 'app-edit-social',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-social.component.html',
  styleUrls: ['./edit-social.component.scss'],
})
export class EditSocialComponent implements OnInit {
  socialsForm!: FormGroup;
  @Input() isVisible!: boolean;
  @Input() isEditMode: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() socialUpdated = new EventEmitter<void>();
  @Input() selectedSocial?: Social;

  socialForm!: FormGroup;
  isLoading = false;
  error: string | null = null;

  // Autocomplete-related variables
  allSocials: Social[] = []; // Array of all system social objects
  filteredSuggestions: Social[] = []; // Filtered social objects for suggestions
  isSuggestionsVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private socialsService: SocialService
  ) {}

  ngOnInit() {
    this.initForm(this.selectedSocial);
    this.getAllSocials();
  }

  initForm(data: any) {
    this.socialForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      url: [data?.url || '', [Validators.required, Validators.pattern(/https?:\/\/.+/)]],
      description: [data?.description || ''],
    });
  }

  getAllSocials() {
    this.socialsService.getAllSocialsLinks().subscribe(
      (data: Social[]) => {
        console.log(data);
        this.allSocials = data;
      },
      (error) => {
        console.error('Error fetching system social platforms:', error);
      }
    );
  }

  // Autocomplete functionality
  onPlatformInput(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    if (input) {
      this.filteredSuggestions = this.allSocials.filter((social) =>
        social.name.toLowerCase().includes(input)
      );
      this.isSuggestionsVisible = this.filteredSuggestions.length > 0;
    } else {
      this.isSuggestionsVisible = false;
    }
  }

  selectSuggestion(suggestion: Social) {
    this.socialForm.patchValue({ name: suggestion.name });
    this.isSuggestionsVisible = false;
  }

  onSubmit() {
    // alert(this.socialForm.valid);

    // console.log('Form Validity:', this.socialForm.valid); // Overall validity
    // console.log('Form Errors:', this.socialForm.errors); // Check global errors if any
  
    // // Check individual controls
    // Object.keys(this.socialForm.controls).forEach((key) => {
    //   const control = this.socialForm.get(key);
    //   console.log(`${key} Valid:`, control?.valid);
    //   console.log(`${key} Errors:`, control?.errors);
    // });

    if( this.allSocials.includes(this.socialForm.value.name)) {
    }else {
      this.error = 'please select a valid social network';
    }


    if (this.socialForm.valid) {
      const socialData = this.socialForm.value;
      const socialId = this.selectedSocial?.id ?? 0;
      this.isLoading = true;

      if (this.isEditMode) {
        this.socialsService.updateSocialLink(socialId, socialData).subscribe(
          () => {
            console.log('Social updated successfully');
            this.closeModal.emit();
          },
          (error) => {
            console.error('Error updating social:', error);
          }
        );
      } else {
        this.socialsService.addSocialLink(socialData).subscribe(
          (data) => {
            console.log('Social added successfully');
            console.log(data)
            this.closeModal.emit();
          },
          (error) => {
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
