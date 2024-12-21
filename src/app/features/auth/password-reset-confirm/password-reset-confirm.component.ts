import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { PasswordResetConfirmRequest } from '../auth.models';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-password-reset-confirm',
  standalone: true,
  imports: [ReactiveFormsModule,FontAwesomeModule],
  templateUrl: './password-reset-confirm.component.html',
  styleUrl: './password-reset-confirm.component.scss'
})
export class PasswordResetConfirmComponent {
  confirmForm!: FormGroup;
  isSubmitting: boolean = false;
  passwordVisibility = false;
  message: string = '';
  error: string = '';
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.confirmForm = this.fb.group(
      {
        token: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(group: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  confirmPasswordReset(): void {
    if (this.confirmForm.invalid) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    this.isSubmitting = true;
    this.message = '';
    this.error = '';

    const requestData: PasswordResetConfirmRequest = {
      token: this.confirmForm.value.token,
      newPassword: this.confirmForm.value.newPassword,
    };

    this.authService.confirmPasswordReset(requestData).subscribe({
      next: (response: any) => {
        this.message = response.message || 'Password successfully reset.';
        this.confirmForm.reset();
      },
      error: (err) => {
        this.error = err.error?.message || 'An error occurred.';
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  togglePasswordVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
