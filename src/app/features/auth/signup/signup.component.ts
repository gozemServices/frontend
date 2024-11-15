import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../landing/components/header/header.component";
import { FirstKeyPipe } from "../../../shared/pipes/first-key.pipe";
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
  errorMessage: string | null = null;
  signupForm: FormGroup;
  loading = false;
  error: string | null = null;
  profilePic: string | null = null;

  constructor(
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]], // Adjust pattern as needed
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['',Validators.required],
      profilePic: [''],
      userType: ['user', Validators.required],
      sector: ['',Validators.required],
      activity: ['',Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
  get formControls() {
    return this.signupForm.controls;
  }

  // Password matching validator
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }


  // Function to handle profile picture change
  onProfilePicChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePic = e.target.result;
      };
      reader.readAsDataURL(file);  // Convert to base64 string
    }
  }

  // Function to remove profile picture
  removeProfilePic() {
    this.profilePic = null;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    // Prepare form data for submission
    const userType = this.signupForm.value.userType;
    const formData = new FormData();
    formData.append('name', this.signupForm.value.name);
    formData.append('surname', this.signupForm.value.surname);
    formData.append('username', this.signupForm.value.username);
    formData.append('email', this.signupForm.value.email);
    formData.append('phone', this.signupForm.value.phone);
    formData.append('password', this.signupForm.value.password);

    if (this.signupForm.value.userType === 'recruiter') {
      formData.append('sector', this.signupForm.value.sector);
      formData.append('activity', this.signupForm.value.activity);
    }

    if (this.profilePic) {
      formData.append('profilePic', this.profilePic);
    }
    
    this.authService.signup(userType,formData).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Please try again.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}