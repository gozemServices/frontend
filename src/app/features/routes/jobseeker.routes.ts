import { Routes } from "@angular/router";
import { authGuard, noAuthGuard } from "../auth/guards";

export const jobSeekerRoutes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('../user-space/dashboard/dashboard.component').then(c => c.DashboardComponent),

    },
    {
        path: 'messages',
        loadComponent: () => import('../user-space/jobseeker-messages/jobseeker-messages.component').then(c => c.JobseekerMessagesComponent),

    },
    {
        path: 'profile',
        loadComponent: () => import('../user-space/profile/profile.component').then(c => c.ProfileComponent)
    },
    {
        path: 'notifications',
        loadComponent: () => import('../user-space/notifications/notifications.component').then(c => c.NotificationsComponent)
    },
    {
        path: 'jobs',
        loadComponent: () => import('../user-space/jobs/jobs.component').then(c => c.JobsComponent)
    },
    {
        path: 'cv-builder',
        loadComponent: () => import('../user-space/cv-builder/cv-builder.component').then(c => c.CvBuilderComponent)
    },
    {
        path: 'statistics',
        loadComponent: () => import('../user-space/statistics/statistics.component').then(c => c.StatisticsComponent)
    },
    {
        path: 'paying-tools',
        loadComponent: () => import('../user-space/paying-tools/paying-tools.component').then(c => c.PayingToolsComponent)
    },
    {
        path: 'proposals',
        loadComponent: () => import('../user-space/job-proposals/job-proposals.component').then(c => c.JobProposalsComponent)
    },
    {
        path: 'applications',
        loadComponent: () => import('../user-space/applications/applications.component').then(c => c.ApplicationsComponent)
    }
]