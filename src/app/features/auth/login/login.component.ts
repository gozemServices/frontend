import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericService } from '../../../core/services/generic.service';

import { HeaderComponent } from "../../landing/components/header/header.component";
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    RouterModule,
    TranslateModule
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isLogin =false;
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  private fb = inject(FormBuilder);
  private genericService =  inject(GenericService);
  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        const token = response.headers.get('Authorization');
        const role = response.headers.get('User-Type');
        const user = response.body;
        if (token && role && user) {
          this.loading = false;
          this.authService.saveToken(token);
          this.authService.saveUserType(role);
          this.authService.saveAuthUser(user);
        }
        const route = `user/${role === 'APPLICANT' ? 'jobseeker' : 'recruiter/admin'}/dashboard/`;
        this.router.navigate([route]);
      },
      error: (err) => {
        this.error = err.error;
        this.loading = false
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
// this.genericService.getCvInfos().subscribe(
//   (data) => {
//     const cvInfos = data;
//     if(cvInfos) {
//       this.loading = false;
//       this.authService.saveToken(token);
//       this.authService.saveUserType(role);
//       this.authService.saveAuthUser(user);
      
//     }
//   },
//   (error) => {
//     console.error('Error fetching experiences:', error);
//     // this.isLoading = false;
//   }
// );