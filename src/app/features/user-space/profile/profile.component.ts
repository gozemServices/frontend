import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../shared/services/user-profile.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmRemoveToolsModalComponent } from './confirm-remove-tools-modal/confirm-remove-tools-modal.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BuyPointsModalComponent } from './buy-points-modal/buy-points-modal.component';
import { faExclamationTriangle, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,TranslateModule,ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  isLoading = true;
  errorMessage: string | null = null;
  updatePasswordForm!: FormGroup;
  faWarning = faWarning;
  faDanger = faExclamationTriangle;

  userInfo = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    location: 'New York, NY'
  };

  userPoints = 120; // Example points

  userTools = [
    { id: 1, name: 'Advanced Analytics Tool' },
    { id: 2, name: 'AI Job Matcher' },
    { id: 3, name: 'Resume Optimizer' }
  ];

  appliedJobs = [
    { 
      title: 'Frontend Developer', 
      company: 'Google', 
      applicationDate: '2024-10-15', 
      status: 'Pending', 
      location: 'Mountain View, CA',
      jobType: 'Full-time' 
    },
    { 
      title: 'Software Engineer', 
      company: 'Microsoft', 
      applicationDate: '2024-09-20', 
      status: 'Approved', 
      location: 'Redmond, WA',
      jobType: 'Full-time' 
    },
    { 
      title: 'UI/UX Designer', 
      company: 'Facebook', 
      applicationDate: '2024-08-01', 
      status: 'Rejected', 
      location: 'Menlo Park, CA',
      jobType: 'Contract' 
    }
  ];

  constructor(private userProfileService: UserProfileService,private dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadUserProfile();
    this.loadUserPoints();
    this.loadUserTools();
    this.loadAppliedJobs();
    this.initPasswordUpdateForm();
  }

  loadUserProfile() {
    this.isLoading = true;
    this.userProfileService.getUserProfile().subscribe(
      data => {
        this.userInfo = data;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load profile data. Please try again later.';
        console.error(error);
      }
    );
  }

  loadUserPoints() {
    this.userProfileService.getUserPoints().subscribe(
      points => this.userPoints = points,
      error => console.error('Error loading user points', error)
    );
  }

  loadUserTools() {
    this.userProfileService.getUserTools().subscribe(
      tools => this.userTools = tools,
      error => console.error('Error loading user tools', error)
    );
  }

  loadAppliedJobs() {
    // Replace with actual API call
    // this.appliedJobs = this.userProfileService.getUserPoints().subscribe(
    //   tools => this.userTools = tools,
    //   error => console.error('Error loading user tools', error)
    // );
  }
    removeTool(toolId: number, toolName: string): void {
      // Open the confirmation dialog
      const dialogRef = this.dialog.open(ConfirmRemoveToolsModalComponent, {
        data: { toolName }
      });
  
      // After the modal is closed, check if the tool should be removed
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Remove the tool if the user confirmed
          this.userTools = this.userTools.filter(tool => tool.id !== toolId);
        }
      });
    }


  

    get f() { return this.updatePasswordForm.controls; }
    passwordMatchValidator(group: AbstractControl): { mismatch: boolean } | null {
      const password = group.get('newPassword')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
    
      return password && confirmPassword && password !== confirmPassword
        ? { mismatch: true }
        : null;
    }
    
    
    initPasswordUpdateForm(): void {
      this.updatePasswordForm = new FormGroup({
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required]),
      }, { validators: this.passwordMatchValidator });  // Group-level validator
    }
    
    

    onSubmit(): void {
      if (this.updatePasswordForm.valid) {
        const formValues = this.updatePasswordForm.value;
        // You can call your service to update the password here
        console.log('Password update successful:', formValues);
        // Add logic for API call to update password.
      } else {
        console.log('Form is invalid');
      }
    }



    buyPoints(): void {
      const dialogRef = this.dialog.open(BuyPointsModalComponent, {
        width: '800px',  
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.userPoints += result;
        }
      });
    }


    onDeactivateClick() {
      if (confirm('Are you sure you want to deactivate your account? This action cannot be undone.')) {
        // Call your API to deactivate the account here
        console.log('Account deactivated');
      }
    }
  
    // Placeholder function for the Cancel action
    onCancelClick() {
      console.log('Deactivation canceled');
    }
  
}
