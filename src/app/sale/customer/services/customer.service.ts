import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService } from '../../../global/data.service';
import { GridData } from '../../../classes/grid-data';
import { SearchTerm } from '../../../classes/search-term';
import { DeviceService } from '../../../global/device.service';
import { Customer } from '../classes/customer';
import { first, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../../../shared/components';

@Injectable()
export class CustomerService {
    url = 'customers';
    constructor(
        private dataService: DataService,
        private device: DeviceService,
        private dialog: MatDialog
    ) {}

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

    changeImage(customerId: number, imageURL: string): Observable<boolean> {
        if (!imageURL) {
            const dialogRef = this.dialog.open(DeleteConfirmComponent, {
                panelClass: 'confirmation-dialog',
                data: {
                    title: 'Delete Confirmation',
                    description: 'Continue deleting the image?',
                    button: 'DELETE'
                }
            });

            return dialogRef.afterClosed().pipe(
                switchMap(confirm => {
                    if (confirm) {
                        return this.dataService.put<any>(
                            this.url + '/' + customerId.toString() + '/image',
                            '"' + imageURL + '"'
                        );
                    } else {
                        return of(false);
                    }
                })
            );
        } else {
            return this.dataService.put<any>(
                this.url + '/' + customerId.toString() + '/image',
                '"' + imageURL + '"'
            );
        }
    }
}
