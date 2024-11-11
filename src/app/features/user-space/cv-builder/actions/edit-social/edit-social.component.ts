import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-social',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-social.component.html',
  styleUrl: './edit-social.component.scss'
})
export class EditSocialComponent {
  socialsForm!: FormGroup;

  // Predefined social platform images (you can update these with actual images)
  platformImages: { [key: string]: string } = {
    'LinkedIn': 'https://example.com/linkedin-icon.png',  // Replace with actual URL or asset path
    'GitHub': 'https://example.com/github-icon.png',  // Replace with actual URL or asset path
    'Twitter': 'https://example.com/twitter-icon.png',  // Replace with actual URL or asset path
    'Facebook': 'https://example.com/facebook-icon.png',  // Replace with actual URL or asset path
    'Instagram': 'https://example.com/instagram-icon.png',  // Replace with actual URL or asset path
    'YouTube': 'https://example.com/youtube-icon.png',  // Replace with actual URL or asset path
    // Add more platform images as needed
  };

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditSocialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEditMode: boolean; socialsData?: any }
  ) {}

  ngOnInit() {
    this.initForm(this.data);
  }

  initForm(data: any) {
    this.socialsForm = this.fb.group({
      platformName: [data.socialsData?.platformName || '', Validators.required],
      url: [data.socialsData?.url || '', [Validators.required, Validators.pattern('https?://.+')]],
      description: [data.socialsData?.description || ''],
    });
  }

  // Return the image URL based on the platform name
  getSocialImageUrl(): string {
    const platform = this.socialsForm.get('platformName')?.value;
    return this.platformImages[platform] || 'https://example.com/default-icon.png';  // Fallback image if platform not found
  }

  onSubmit() {
    if (this.socialsForm.valid) {
      const socialsData = this.socialsForm.value;
      this.dialogRef.close(socialsData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
