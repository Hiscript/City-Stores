import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Observable, Subject } from 'rxjs';
import { GridData } from '../../../classes/grid-data';
import { GridType } from '../../../classes/grid-type.enum';
import { SearchService } from '../../../global/search.service';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { CustomerStatuses } from '../classes/customer-status';
import { DeviceService } from '../../../global/device.service';

@Component({
    templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit, OnDestroy {
    customers: Observable<GridData>;
    gridType = GridType.Customer;
    statuses = CustomerStatuses;

    private unsubscribe$ = new Subject();

    constructor(
        private customerService: CustomerService,
        private searchService: SearchService,
        public device: DeviceService
    ) {}

    ngOnInit() {
        this.customers = this.searchService.SearchTerms.pipe(
            debounceTime(500),
            takeUntil(this.unsubscribe$),
            switchMap(terms => this.customerService.get(terms))
        );
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.searchService.clear();
    }
}
