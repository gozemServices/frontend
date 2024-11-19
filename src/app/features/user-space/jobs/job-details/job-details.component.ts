import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent {
  job: any;
  relatedJobs!: any[];

  ngOnInit() {
    // Simulated job data (replace with API call)
    this.job = {
      title: 'Senior Frontend Developer',
      company: 'Google Inc.',
      location: 'Mountain View, CA',
      type: 'Full-Time',
      remote: true,
      salary: '$120,000 - $150,000/year',
      postedAgo: '3 days ago',
      description: 'As a Senior Frontend Developer at Google, you will be responsible for creating user-friendly interfaces.',
      responsibilities: [
        'Design and implement modern user interfaces.',
        'Collaborate with backend developers to integrate APIs.',
        'Optimize applications for performance and scalability.',
        'Lead code reviews and provide mentorship to junior developers.',
      ],
      qualifications: [
        '5+ years of experience in frontend development.',
        'Strong knowledge of JavaScript, React, and Angular.',
        'Experience with RESTful APIs and responsive design.',
        'Excellent problem-solving and communication skills.',
      ],
      benefits: [
        'Competitive salary and stock options.',
        'Comprehensive health insurance.',
        'Work-from-home flexibility.',
        'On-site perks: free meals, gym access, and more.',
      ],
      contact: {
        email: 'jobs@google.com',
        phone: '+1 (123) 456-7890',
      },
    };

    // Simulated related jobs data (replace with API call)
    this.relatedJobs = [
      { id: 1, title: 'Backend Developer', company: 'Amazon', location: 'Seattle, WA' },
      { id: 2, title: 'UX Designer', company: 'Meta', location: 'Menlo Park, CA' },
      { id: 3, title: 'Data Scientist', company: 'Microsoft', location: 'Redmond, WA' },
    ];
  }
}
