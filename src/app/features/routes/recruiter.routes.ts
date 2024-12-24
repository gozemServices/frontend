import { Routes } from "@angular/router";
import { authGuard, noAuthGuard } from "../auth/guards";
import { RecruiterSpaceComponent } from "../recruiter-space/recruiter-space.component";

export const recruiterRoutes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('../recruiter-space/dashboard/dashboard.component').then(c => c.DashboardComponent)
    },
    {
        path: 'profile',
        loadComponent: () => import('../recruiter-space/profile-management/profile-management.component').then(c => c.ProfileManagementComponent)
    },
    {
        path: 'offers',
        loadComponent: () => import('../recruiter-space/offers/offers.component').then(c => c.OffersComponent)
    },
     {
        path: 'candidatures/:id',
        loadComponent: () => import('../recruiter-space/candidatures/candidatures.component').then(c => c.CandidaturesComponent)
    },
    {
        path: 'paying-tools',
        loadComponent: () => import('../recruiter-space/paying-tools/paying-tools.component').then(c => c.PayingToolsComponent)
    },
    {
        path: 'events',
        loadComponent: () => import('../recruiter-space/events/events.component').then(c => c.EventsComponent)
    },
    {
        path: 'candidates',
        loadComponent: () => import('../recruiter-space/candidates/candidates.component').then(c => c.CandidatesComponent)
    },
    {
        path: 'interviews-schedule/candidates/:id',
        loadComponent: () => import('../recruiter-space/interviews/interviewed/interviewed.component').then(c => c.InterviewedComponent)
    },
    
]
