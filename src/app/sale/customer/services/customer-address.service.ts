import { Injectable } from '@angular/core';
import { DataService } from '../../../global/data.service';
import { CustomerAddress } from '../classes/customer-address';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../../../shared/components';

@Injectable()
export class CustomerAddressService {
    url = 'customers';
    constructor(private dataService: DataService, private dialog: MatDialog) {}

    get(customerId: number): Observable<CustomerAddress[]> {
        return this.dataService.get<CustomerAddress[]>(
            this.url + '/' + customerId.toString() + '/Addresses',
            'customerAddress'
        );
    }

    detail(customerId: number, addressId: number): Promise<CustomerAddress> {
        return this.dataService
            .get<CustomerAddress>(
                this.url + '/' + customerId.toString() + '/Addresses' + '/' + addressId.toString(),
                'customerAddress'
            )
            .pipe(first())
            .toPromise();
    }

    insert(customerId: number, address: CustomerAddress): Promise<CustomerAddress> {
        return this.dataService
            .post<CustomerAddress>(
                this.url + '/' + customerId.toString() + '/Addresses',
                address,
                'saveAddress'
            )
            .pipe(first())
            .toPromise();
    }

    update(customerId: number, address: CustomerAddress): Promise<CustomerAddress> {
        return this.dataService
            .put<CustomerAddress>(
                this.url + '/' + customerId.toString() + '/Addresses',
                address,
                'saveAddress'
            )
            .pipe(first())
            .toPromise();
    }

    delete(customerId: number, addressId: number): Observable<boolean> {
        const dialogRef = this.dialog.open(DeleteConfirmComponent, {
            panelClass: 'confirmation-dialog',
            data: {
                title: 'Delete Confirmation',
                description: 'Continue deleting the address?',
                button: 'DELETE'
            }
        });

        return dialogRef.afterClosed().pipe(
            switchMap(confirm => {
                if (confirm) {
                    return this.dataService.delete<boolean>(
                        this.url +
                            '/' +
                            customerId.toString() +
                            '/Addresses/' +
                            addressId.toString(),
                        'deleteAddress'
                    );
                } else {
                    return of(false);
                }
            })
        );
    }
}
