import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuardService } from './shared/services/security/auth-guard.service';

export const routes: Routes = [
    { path: '', redirectTo:'admin', pathMatch: 'full'},
    { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
    { path: 'admin'/*, canActivate: [AuthGuardService]*/, loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, { useHash: false });