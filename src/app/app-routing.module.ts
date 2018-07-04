import { RouterModule, Routes } from '@angular/router';

const AppRoutes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'app', loadChildren: './layout/layout.module#LayoutModule' }
];

export const AppRoutingModule = RouterModule.forRoot(AppRoutes);
