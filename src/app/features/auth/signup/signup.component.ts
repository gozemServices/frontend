import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../landing/components/header/header.component";
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  authService = inject(AuthService);
  router = inject(Router);
  signupForm!: FormGroup;
  loading = false;
  error: string | null = null;
  profilePicPreview: string | null = null;
  profilePicFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  get formControls() {
    return this.signupForm.controls;
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onProfilePicChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profilePicFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeProfilePic() {
    this.profilePicPreview = null;
    this.profilePicFile = null;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = null;
    const userType = this.signupForm.value.userType;
    const createPayload = () => {
      const basePayload = {
        name: this.signupForm.value.name,
        surname: this.signupForm.value.surname,
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        phone: this.signupForm.value.phone,
        password: this.signupForm.value.password,
      };
  
      if (userType === 'user') { return { ...basePayload, role: 'APPLICANT' };}
      if (userType === 'recruiter') {
        return {
          ...basePayload,
          role: 'RECRUITER',
          sector: this.signupForm.value.sector,
          activity: this.signupForm.value.activity,
        };
      }
      return basePayload;
    };
  
    const payload = createPayload();
  
    if (userType === 'user') {
      const formData = new FormData();
      formData.append('user', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
      if (this.profilePicFile) {
        formData.append('profilePicture', this.profilePicFile);
      }
      formData.forEach((value, key) => console.log(`${key}:`, value));
      
      this.authService.signupUser(formData).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
          console.log('Is the success block reached?', response);
        },
        error: (err) => {
          this.error = err.error?.message || 'Registration failed. Please try again.';
          this.loading = false;
          console.log('Error response:', err);
        },
        complete: () => (this.loading = false),
      });
    } else if (userType === 'recruiter') {

      this.authService.signupRecruiter(payload).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => {
          this.error = err.error?.message || 'Registration failed. Please try again.';
          this.loading = false;
        },
        complete: () => (this.loading = false),
      });
    } else {
      this.error = 'Invalid user type. Please try again.';
      this.loading = false;
    }
  }
  
  initForm() {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        surname: ['', [Validators.required, Validators.minLength(3)]],
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        userType: ['user', Validators.required],
        sector: [''],
        activity: [''],
        profilePic: [''],
      },
      { validators: this.passwordMatchValidator }
    );

    this.signupForm.get('userType')?.valueChanges.subscribe((userType) => {
      const sectorControl = this.signupForm.get('sector');
      const activityControl = this.signupForm.get('activity');

      if (userType === 'recruiter') {
        sectorControl?.setValidators([Validators.required]);
        activityControl?.setValidators([Validators.required]);
      } else {
        sectorControl?.clearValidators();
        activityControl?.clearValidators();
      }

      sectorControl?.updateValueAndValidity();
      activityControl?.updateValueAndValidity();
    });
  }
}