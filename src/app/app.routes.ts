import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { AuthComponent } from './features/auth/auth.component';
import { RecruiterSpaceComponent } from './features/recruiter-space/recruiter-space.component';
import { UserSpaceComponent } from './features/user-space/user-space.component';

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
        path: 'user/admin',
        component: UserSpaceComponent,
    },
    {
        path: 'user/recruiter/admin',
        component: RecruiterSpaceComponent
    },

      // Redirect to home if no route found
    { path: '**', redirectTo: 'home' },
];
