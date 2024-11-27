import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { AuthComponent } from './features/auth/auth.component';
import { RecruiterSpaceComponent } from './features/recruiter-space/recruiter-space.component';
import { UserSpaceComponent } from './features/user-space/user-space.component';
import { recruiterRoutes } from './features/routes/recruiter.routes';
import { authGuard } from './features/auth/guards';
import { JobDetailsComponent } from './shared/components/job-details/job-details.component';

export const routes: Routes = [
    { path: '',  redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'home',
        loadComponent: () => import('./features/landing/landing.component').then((c) => c.LandingComponent),
    },
    {
        path: 'auth',
        component: AuthComponent,
        loadChildren: () => import('./features/auth/auth.routes').then(c => c.authRoutes)
    },
    {
        path: 'user/jobseeker',
        canActivate: [authGuard],
        loadChildren: () => import('./features/routes/jobseeker.routes').then(c => c.jobSeekerRoutes),
        component: UserSpaceComponent,
    },
    {
        path: 'user/recruiter/admin',
        canActivate: [authGuard],
        loadChildren: () => import('./features/routes/recruiter.routes').then(c => c.recruiterRoutes),
        component: RecruiterSpaceComponent
    },
    {
        path: 'user/job/details/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./shared/components/job-details/job-details.component').then(c => c.JobDetailsComponent)
    },

      // Redirect to home if no route found
    { path: '**', redirectTo: 'home' },
];
