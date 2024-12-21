import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset-request',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './password-reset-request.component.html',
  styleUrl: './password-reset-request.component.scss'
})
export class PasswordResetRequestComponent {
  resetForm!: FormGroup;
  isSubmitting: boolean = false;
  message: string = '';
  error: string = '';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  constructor() {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  requestPasswordReset() {
    if (this.resetForm.invalid) {
      this.error = 'Please enter a valid e-mail adress';
      return;
    }

    this.isSubmitting = true;
    this.message = '';
    this.error = '';

    const requestData = this.resetForm.value;

    this.authService.requestPasswordReset(requestData).subscribe({
      next: (response: any) => {
        this.message = response.message || 'The reinitialisation email have been sent with success';
        this.resetForm.reset();
        this.router.navigate(['/auth/password-reset-confirm']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Something has failed ! please try again';
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
