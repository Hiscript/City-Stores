import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent
    }
];

export const DashboardRoutingModule = RouterModule.forChild(DashboardRoutes);
