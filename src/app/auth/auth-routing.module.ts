import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth';

export const AuthRoutes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent }
        ]
    }
];

export const AuthRoutingModule = RouterModule.forChild(AuthRoutes);
