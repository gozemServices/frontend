import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,TranslateModule],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.scss'
})
export class ProfileManagementComponent {
  // Profile Form (Reactive Form)
  profileForm: FormGroup;

  // Avatar or profile picture URL
  avatarUrl: string = 'https://www.example.com/default-avatar.png'; 

  companyLogoUrl: string = 'logos/gozen-services.jpg';

  constructor(private fb: FormBuilder) {
    // Initialize the form with default values
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      
      companyName: ['', [Validators.required, Validators.maxLength(100)]],
      companyEmail: ['', [Validators.required, Validators.email]],
      companyWebsite: ['', [Validators.required, Validators.pattern('https?://.+')]],
      
      password: ['', [Validators.minLength(8)]],
      confirmPassword: ['']
    });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      console.log('Profile updated successfully', this.profileForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  // Method to handle avatar upload
  onAvatarChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Method to handle company logo upload
  onCompanyLogoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.companyLogoUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Method to handle password change (optional)
  changePassword() {
    const { password, confirmPassword } = this.profileForm.value;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      // Simulate password change logic
      console.log('Password changed successfully');
    }
  }

  get formControls() {
    return this.profileForm.controls;
  }
}
