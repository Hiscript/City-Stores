import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerAddressDetailComponent } from './customer-address-detail.component';
import { CustomerAddress } from '../../classes/customer-address';
import { CustomerAddressService } from '../../services/customer-address.service';

@Component({
    selector: 'customer-address',
    templateUrl: './customer-address.component.html'
})
export class CustomerAddressComponent implements OnInit {
    @Input() customerId: number;

    addresses: CustomerAddress[];

    constructor(
        private dialog: MatDialog,
        private customerAddressService: CustomerAddressService
    ) {}

    ngOnInit() {
        if (this.customerId) {
            this.customerAddressService.get(this.customerId).subscribe(x => (this.addresses = x));
        }
    }

    add() {
        this.openDetailDialog(new CustomerAddress());
    }

    edit(addressId: number) {
        this.customerAddressService.detail(this.customerId, addressId).then(address => {
            this.openDetailDialog(address);
        });
    }

    remove(addressId: number) {
        this.customerAddressService.delete(this.customerId, addressId).subscribe(deleted => {
            if (deleted) {
                this.ngOnInit();
            }
        });
    }

    private openDetailDialog(address: CustomerAddress) {
        const dialogRef = this.dialog.open(CustomerAddressDetailComponent, {
            panelClass: ['full-sm-dialog', 'double'],
            data: { customerId: this.customerId, address: address }
        });

        dialogRef.afterClosed().subscribe(newAddress => {
            if (newAddress) {
                this.ngOnInit();
            }
        });
    }
}
