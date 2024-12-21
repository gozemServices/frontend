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
        path: 'email-verification',
        canActivate: [noAuthGuard],
        loadComponent: () => import('./email-verification/email-verification.component').then(c => c.EmailVerificationComponent)
    },
    {
        path: 'password-reset-request',
        canActivate: [noAuthGuard],
        loadComponent: () => import('./password-reset-request/password-reset-request.component').then(c => c.PasswordResetRequestComponent)
    },
    {
        path: 'password-reset-confirm',
        canActivate: [noAuthGuard],
        loadComponent: () => import('./password-reset-confirm/password-reset-confirm.component').then(c => c.PasswordResetConfirmComponent)
    }
]

