import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericService } from '../../../core/services/generic.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../landing/components/header/header.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FirstKeyPipe } from "../../../shared/pipes/first-key.pipe";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    HttpClientModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FirstKeyPipe
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  
  signupForm: FormGroup;
  loading = false;
  error: string | null = null;
  profilePic: string | null = null;

  constructor(private fb: FormBuilder, private genericService: GenericService) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Adjust pattern as needed
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      profilePic: ['',Validators.required]  // to handle profile picture
    }, { validators: this.passwordMatchValidator });
  }

  get formControls() {
    return this.signupForm.controls;
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    // Prepare form data for submission
    const formData = new FormData();
    formData.append('name', this.signupForm.value.name);
    formData.append('surname', this.signupForm.value.surname);
    formData.append('username', this.signupForm.value.username);
    formData.append('email', this.signupForm.value.email);
    formData.append('phone', this.signupForm.value.phone);
    formData.append('password', this.signupForm.value.password);
    if (this.profilePic) {
      formData.append('profilePic', this.profilePic);
    }

    this.genericService.postData('signup', formData).subscribe(
      response => {
        console.log('Signup successful', response);
        this.loading = false;
      },
      error => {
        this.error = 'Signup failed. Please try again.';
        this.loading = false;
      }
    );
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
}
