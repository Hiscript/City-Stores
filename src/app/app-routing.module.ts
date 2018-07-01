import { RouterModule, Routes } from '@angular/router';

const AppRoutes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
];

export const AppRoutingModule = RouterModule.forRoot(AppRoutes);
