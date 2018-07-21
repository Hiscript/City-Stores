import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerAddressService } from '../../services/customer-address.service';
import { DropdownType } from '../../../../classes/dropdown-type.enum';

@Component({
    templateUrl: './customer-address-detail.component.html'
})
export class CustomerAddressDetailComponent {
    addressForm: FormGroup;
    dropdownType;

    constructor(
        private fb: FormBuilder,
        private customerAddressService: CustomerAddressService,
        public dialogRef: MatDialogRef<CustomerAddressDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any // customerId , address
    ) {
        this.createForm();
        this.dropdownType = DropdownType;
        this.addressForm.patchValue(this.data.address);
    }

    private createForm(): void {
        this.addressForm = this.fb.group({
            name: ['', Validators.required],
            mobile: ['', Validators.required],
            address: ['', Validators.required],
            pinCode: ['', Validators.required],
            state: [''],
            district: [''],
            city: ['', Validators.required],
            addressTypeId: ['', Validators.required]
        });
    }

    private updateModel(): void {
        const formModel = this.addressForm.getRawValue();
        this.data.address.name = formModel.name;
        this.data.address.mobile = formModel.mobile;
        this.data.address.address = formModel.address;
        this.data.address.pinCode = formModel.pinCode;
        this.data.address.state = formModel.state;
        this.data.address.district = formModel.district;
        this.data.address.city = formModel.city;
        this.data.address.addressTypeId = formModel.addressTypeId;
    }

    submit(): void {
        if (this.addressForm.valid) {
            this.updateModel();
            if (this.data.address.customerAddressId > 0) {
                this.customerAddressService
                    .update(this.data.customerId, this.data.address)
                    .then(address => {
                        this.dialogRef.close(address);
                    });
            } else {
                this.customerAddressService
                    .insert(this.data.customerId, this.data.address)
                    .then(address => {
                        this.dialogRef.close(address);
                    });
            }
        }
    }

    remove(): void {
        this.customerAddressService
            .delete(this.data.customerId, this.data.address.customerAddressId)
            .subscribe(deleted => {
                if (deleted) {
                    this.dialogRef.close(true);
                }
            });
    }

    close(): void {
        this.dialogRef.close();
    }
}
