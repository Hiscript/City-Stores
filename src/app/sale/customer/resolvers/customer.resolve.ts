import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { CustomerService } from '../services/customer.service';
import { Customer } from '../classes/customer';

@Injectable()
export class CustomerResolve implements Resolve<Customer> {
    constructor(private customerService: CustomerService) {}

    resolve(route: ActivatedRouteSnapshot) {
        if (route.paramMap.get('id') === 'new') {
            return new Customer();
        }

        return this.customerService.detail(+route.paramMap.get('id'));
    }
}
