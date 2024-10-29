import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/authModule/login/login.component';
import { SignupComponent } from './features/authModule/signup/signup.component';
import { AuthComponent } from './features/authModule/auth/auth.component';

export const routes: Routes = [
    {
        path: '', component: AppComponent
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {path: 'login', component: LoginComponent},
            {path: 'signup', component: SignupComponent}
        ]
    }
];
