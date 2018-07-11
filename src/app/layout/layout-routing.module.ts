import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../global/auth.guard';
import { Right } from '../global/rights.enum';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: '/app/home', pathMatch: 'full' },
            {
                path: 'home',
                component: HomeComponent,
                canActivate: [AuthGuard],
                data: { title: 'Home' }
            },
            {
                path: 'dashboard',
                loadChildren: '../dashboard/dashboard.module#DashboardModule',
                canActivate: [AuthGuard],
                data: { right: Right.dashboard, title: 'Dashboard' }
            },
            {
                path: 'sale',
                loadChildren: '../sale/sale.module#SaleModule',
                canActivate: [AuthGuard]
            }
        ]
    }
];

export const LayoutRoutingModule = RouterModule.forChild(routes);
