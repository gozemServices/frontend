import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
  verificationForm!: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.verificationForm = this.fb.group({
      code: this.fb.array(
        new Array(6).fill('').map(() =>
          this.fb.control('', [Validators.required, Validators.pattern(/^\d$/)])
        )
      ),
    });
  }

  get userEmail() {
    return this.authService.email();
  }

  get codeControls(): FormControl[] {
    return (this.verificationForm.get('code') as FormArray).controls as FormControl[];
  }

  moveToNextInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const isBackspace = event instanceof KeyboardEvent && event.key === 'Backspace';
    const nextInputIndex = isBackspace ? index - 1 : index + 1;

    if (input.value && !isBackspace && nextInputIndex < 6) {
      const nextInput = document.getElementById(`digit-${nextInputIndex}`) as HTMLInputElement;
      nextInput?.focus();
    } else if (isBackspace && nextInputIndex >= 0) {
      const prevInput = document.getElementById(`digit-${nextInputIndex}`) as HTMLInputElement;
      prevInput?.focus();
    }
  }

  submitCode() {
    if (this.verificationForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = null;

      const code = this.codeControls.map((control) => control.value).join('');
      // console.log('Code submitted:', code);
      const emailVerificationDto = {
        email: this.userEmail ?? '',
        code: code
      }
      this.authService.verifyEmail(emailVerificationDto).subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.errorMessage = 'Invalid or expired code. Please try again.';
          console.error(error);
        }
      });
    }
  }
}
