
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  companiesAdvantages: { title: string, description: string }[] = [
    {
      title: "ACCESS_TALENT_POOL",
      description: "EASILY_SEARCH_CANDIDATES"
    },
    {
      title: "ENHANCED_SCREENING_TOOLS",
      description: "STANDARDIZED_CV_FORMATS"
    },
    {
      title: "CUSTOMIZABLE_CV_DATABASE",
      description: "SAVE_AND_ORGANIZE_PROFILES"
    },
    {
      title: "DIRECT_MESSAGING_SCHEDULING",
      description: "CONTACT_AND_SCHEDULE_INTERVIEWS"
    },
    {
      title: "ANALYTICS_AND_INSIGHTS",
      description: "MAKE_INFORMED_RECRUITMENT_DECISIONS"
    },
  ];
  
  jobSeekersAdvantages: {title: string, description: string}[] = [
    {
      title: "JOBSEEKER_PROFESSIONAL_CV_BUILDER",
      description: "JOBSEEKER_CREATE_CUSTOM_CV"
    },
    {
      title: "JOBSEEKER_PERSONALIZED_JOB_RECOMMENDATIONS",
      description: "JOBSEEKER_RECEIVE_JOB_MATCHES"
    },
    {
      title: "JOBSEEKER_ENHANCED_PROFILE_VISIBILITY",
      description: "JOBSEEKER_SHOWCASE_SKILLS"
    },
    {
      title: "JOBSEEKER_APPLICATION_TRACKING",
      description: "JOBSEEKER_TRACK_APPLICATION_STATUS"
    },
    {
      title: "JOBSEEKER_CAREER_RESOURCES",
      description: "JOBSEEKER_ACCESS_CAREER_TOOLS"
    }
  ]
  
  constructor(private translate: TranslateService) {}


}
