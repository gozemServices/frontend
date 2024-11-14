import { Routes } from "@angular/router";
import { noAuthGuard } from "./guards/no-auth.guard";

export const authRoutes: Routes = [
    {
        path: 'login',
        canActivate: [noAuthGuard],
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'signup',
        canActivate: [noAuthGuard],
        loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent)
    },
    {
        path: 'password/recover',
        canActivate: [noAuthGuard],
        loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent)
    }
]