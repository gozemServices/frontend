import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { AuthComponent } from './features/auth/auth/auth.component';
import { UserDashboardComponent } from './features/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    {
        path: '',  
        loadComponent: () =>
            import('./features/landing/landing.component').then((c) => c.LandingComponent),
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {path: 'login', component: LoginComponent},
            {path: 'signup', component: SignupComponent}
        ]
    },
    {
        path: 'user/admin',
        component: UserDashboardComponent,
    }
];
