import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../global/data.service';
import { GridData } from '../../classes/grid-data';
import { SearchTerm } from '../../classes/search-term';
import { DeviceService } from '../../global/device.service';
import { Customer } from './classes/customer';
import { first } from 'rxjs/operators';

@Injectable()
export class CustomerService {
    url = 'customers';
    constructor(private dataService: DataService, private device: DeviceService) {}

    get(terms: SearchTerm[] = []): Observable<GridData> {
        if (this.device.handset) {
            return this.dataService.get<GridData>(
                this.url + '/m?terms=' + JSON.stringify(terms),
                'search'
            );
        } else {
            return this.dataService.get<GridData>(
                this.url + '?terms=' + JSON.stringify(terms),
                'search'
            );
        }
    }

    detail(customerId: number): Promise<Customer> {
        return this.dataService
            .get<Customer>(this.url + '/' + customerId.toString(), 'customer')
            .pipe(first())
            .toPromise();
    }

    insert(customer: Customer) {
        return this.dataService
            .post<Customer>(this.url, customer, 'customer')
            .pipe(first())
            .toPromise();
    }

    update(customer: Customer) {
        return this.dataService
            .put<Customer>(this.url, customer, 'customer')
            .pipe(first())
            .toPromise();
    }

    changeImage(customerId: number, imageURL: string) {
        return this.dataService
            .put<any>(this.url + '/' + customerId.toString() + '/image', '"' + imageURL + '"')
            .subscribe();
    }
}
