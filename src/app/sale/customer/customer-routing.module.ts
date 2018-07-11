import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './list/customer-list.component';

export const CustomerRoutes: Routes = [
    {
        path: '',
        component: CustomerListComponent
    }
];

export const CustomerRoutingModule = RouterModule.forChild(CustomerRoutes);
