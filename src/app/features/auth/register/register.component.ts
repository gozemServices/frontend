import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { HeaderComponent } from "../../landing/components/header/header.component";
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    RouterModule,
    TranslateModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  @ViewChild('tabSelector', { static: true }) tabSelector!: ElementRef;

  recruiterForm!: FormGroup;
  jobseekerForm!: FormGroup;
  loading = false;
  error: string | null = null;
  profilePicPreview: string | null = null;
  profilePicFile: File | null = null;
  activeTab: 'jobseeker' | 'recruiter' = 'jobseeker';
  tabWidth: string = '0px';
  tabPosition: number = 0;
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  ngOnInit(){
    this.initForms();
    this.switchTab('jobseeker');
  }

  initForms() {
    this.recruiterForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      sector: ['', Validators.required],
      activity: ['', Validators.required],
      profilePic: [''],
    }, { validators: this.passwordMatchValidator });

    this.jobseekerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      profilePic: [''],
    }, { validators: this.passwordMatchValidator });
  }

  get recruiterControls() {
    return this.recruiterForm.controls;
  }

  get jobseekerControls() {
    return this.jobseekerForm.controls;
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
    const form = this.activeTab === 'recruiter' ? this.recruiterForm : this.jobseekerForm;

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const payload = this.createPayload();
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    if (this.profilePicFile) {
      formData.append('profilePicture', this.profilePicFile);
    }else {
      this.error = 'error profile pic';
      return;
    }
    console.log(formData);
    const signupMethod = this.activeTab === 'recruiter' 
      ? this.authService.signupRecruiter(formData) 
      : this.authService.signupUser(formData);

    signupMethod.subscribe({
      next: () => this.router.navigate(['/auth/email-verification']),
      error: (err) => {
        this.error = err.error || 'Registration failed. Please try again.';
        this.loading = false;
        console.log(this.error);
      },
      complete: () => (this.loading = false),
    });
  }

  createPayload() {
    if (this.activeTab === 'recruiter') {
      return {
        name: this.recruiterForm.value.name,
        email: this.recruiterForm.value.email,
        username: this.recruiterForm.value.username,
        phone: this.recruiterForm.value.phone,
        password: this.recruiterForm.value.password,
        role: 'EMPLOYEER',
        sector: this.recruiterForm.value.sector,
        activity: this.recruiterForm.value.activity,
      };
    }

    return {
      name: this.jobseekerForm.value.name,
      surname: this.jobseekerForm.value.surname,
      username: this.jobseekerForm.value.username,
      email: this.jobseekerForm.value.email,
      phone: this.jobseekerForm.value.phone,
      password: this.jobseekerForm.value.password,
      role: 'APPLICANT',
    };
  }

  switchTab(tab: 'recruiter' | 'jobseeker') {
    this.activeTab = tab;
    this.error = null;
    this.updateIndicator();
    this.jobseekerForm.markAsUntouched();
    this.recruiterForm.markAsUntouched();  
  }
    
    updateIndicator() {
      const tabs = this.tabSelector.nativeElement.querySelectorAll('.tab');
      const activeIndex = this.activeTab === 'jobseeker' ? 0 : 1;
      const activeTabElement = tabs[activeIndex];
    
      this.tabWidth = activeTabElement.offsetWidth + 'px';
      this.tabPosition = activeTabElement.offsetLeft;
    }
    
}
