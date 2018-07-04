import { RouterModule, Routes } from '@angular/router';

const AppRoutes: Routes = [
    { path: '', redirectTo: '/app/home', pathMatch: 'full' },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'app', loadChildren: './layout/layout.module#LayoutModule' },
    { path: 'exception', loadChildren: './exceptions/exception.module#ExceptionModule' }
];

export const AppRoutingModule = RouterModule.forRoot(AppRoutes);
