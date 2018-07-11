import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../global/auth.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: '/app/sale/customers', pathMatch: 'full' },
            {
                path: 'customers',
                loadChildren: './customer/customer.module#CustomerModule',
                canActivate: [AuthGuard]
            }
        ]
    }
];

export const SaleRoutingModule = RouterModule.forChild(routes);
