import { NgModule } from '@angular/core';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './list/customer-list.component';
import { CustomerService } from './customer.service';
import { ControlModule } from '../../controls/control.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { CustomerDetailComponent } from './detail/customer-detail.component';
import { CustomerResolve } from './resolvers/customer.resolve';
import { CustomerOverviewComponent } from './detail/overview/customer-overview.component';
import { CustomerAddressComponent } from './detail/address/customer-address.component';
import { DocumentModule } from '../../document/document.module';

@NgModule({
    imports: [CustomerRoutingModule, ControlModule, SharedModule, MaterialModule, DocumentModule],
    declarations: [
        CustomerListComponent,
        CustomerDetailComponent,
        CustomerOverviewComponent,
        CustomerAddressComponent
    ],
    providers: [CustomerService, CustomerResolve]
})
export class CustomerModule {}
