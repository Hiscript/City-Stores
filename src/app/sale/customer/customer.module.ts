import { NgModule } from '@angular/core';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './list/customer-list.component';
import { CustomerService } from './customer.service';
import { ControlModule } from '../../controls/control.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [CustomerRoutingModule, ControlModule, SharedModule],
    declarations: [CustomerListComponent],
    providers: [CustomerService]
})
export class CustomerModule {}
