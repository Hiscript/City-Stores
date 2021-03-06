import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Observable, Subject } from 'rxjs';
import { GridData } from '../../../classes/grid-data';
import { GridType } from '../../../classes/grid-type.enum';
import { SearchService } from '../../../global/search.service';
import { debounceTime, switchMap, takeUntil, finalize, share } from 'rxjs/operators';
import { DeviceService } from '../../../global/device.service';
import { Router } from '@angular/router';
import { CustomerStatus } from '../classes/customer-status.enum';

@Component({
    templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit, OnDestroy {
    customers: Observable<GridData>;
    gridType = GridType.Customer;
    statuses = CustomerStatus;

    private unsubscribe$ = new Subject();

    constructor(
        private router: Router,
        private customerService: CustomerService,
        private searchService: SearchService,
        public device: DeviceService
    ) {}

    ngOnInit() {
        this.customers = this.searchService.SearchTerms.pipe(
            debounceTime(500),
            takeUntil(this.unsubscribe$),
            switchMap(terms => this.customerService.get(terms)),
            share()
        );
    }

    add() {
        this.router.navigate(['/app/sale/customers/new']);
    }

    select(customerId: number): void {
        this.router.navigate(['/app/sale/customers', customerId]);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.searchService.clear();
    }
}
