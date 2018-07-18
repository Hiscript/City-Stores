import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './list/customer-list.component';
import { CustomerDetailComponent } from './detail/customer-detail.component';
import { CustomerResolve } from './resolvers/customer.resolve';

export const CustomerRoutes: Routes = [
    {
        path: '',
        component: CustomerListComponent,
        data: { title: 'Customer List' }
    },
    {
        path: ':id',
        component: CustomerDetailComponent,
        resolve: { customer: CustomerResolve },
        data: { title: 'Customer Detail' }
    }
];

export const CustomerRoutingModule = RouterModule.forChild(CustomerRoutes);
