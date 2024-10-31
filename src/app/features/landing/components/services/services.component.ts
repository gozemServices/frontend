import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  companiesAdvantages: {title: string, description: string}[] = [
    {
      title: "Access to a Vast Talent Pool",
      description: "Easily search, filter, and find qualified candidates suited for various roles across industries"
    },
    {
      title: "Enhanced Screening Tools",
      description: "View standardized CV formats, skill summaries, and candidate profiles to streamline the hiring process"
    },
    {
      title: "Customizable CV Database",
      description: "Save and organize favorite profiles, and set notifications for new candidates meeting your requirements"
    },
    {
      title: "Direct Messaging and Scheduling",
      description: "Contact candidates directly or schedule interviews within the platform"
    },
    {
      title: "Analytics and Insights",
      description: "Access data on search trends and hiring stats to make informed recruitment decisions"
    },
  ]
  jobSeekersAdvantages: {title: string, description: string}[] = [
    {
      title: "Professional CV Builder",
      description: "Create and customize a standout CV with templates that suit various industries and roles."
    },
    {
      title: "Personalized Job Recommendations",
      description: "Receive job matches based on your skills, experience, and career goals."
    },
    {
      title: "Enhanced Profile Visibility",
      description: "Showcase your skills and achievements directly to top companies"
    },
    {
      title: "Application Tracking",
      description: "Stay updated on the status of your applications, from submission to interview invites"
    },
    {
      title: "Career Resources",
      description: "Access tools and tips on improving your CV, acing interviews, and advancing your career"
    },
  ]

}
