import { Routes } from "@angular/router";
import { authGuard } from "../auth/guards";

export const authRoutes: Routes = [
    {
        path: 'home',
        canActivate: [authGuard],
        loadComponent: () => import('../user-space/dashboard/dashboard.component').then(c => c.DashboardComponent)
    }
]