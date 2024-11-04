import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericService } from '../../../core/services/generic.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../landing/components/header/header.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  // Note: Changed 'styleUrl' to 'styleUrls'
})
export class LoginComponent {
  
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private genericService: GenericService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Mark all controls as touched to show validation errors
      return;
    }

    this.loading = true;
    this.error = null;

    this.genericService.postData('login', this.loginForm.value).subscribe(
      response => {
        console.log('Login successful', response);
        this.loading = false;
        // Handle successful login, e.g., navigate or store token
      },
      error => {
        this.error = 'Login failed. Please check your credentials.';
        this.loading = false;
      }
    );
  }
}
