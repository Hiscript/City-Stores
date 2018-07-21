import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../classes/customer';

@Component({
    selector: 'customer-overview',
    templateUrl: './customer-overview.component.html'
})
export class CustomerOverviewComponent implements OnInit {
    @Input() customer: Customer;
    @Output() saved: EventEmitter<Customer> = new EventEmitter<Customer>();

    customerForm: FormGroup;

    constructor(private customerService: CustomerService, private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.customerForm.patchValue(this.customer);
    }

    private createForm(): void {
        this.customerForm = this.fb.group({
            customerName: [null, Validators.required],
            mobile: [null],
            email: [null],
            note: [null],
            status: [null, Validators.required]
        });
    }

    private updateModel(): void {
        const formModel = this.customerForm.value;
        this.customer.customerName = formModel.customerName;
        this.customer.mobile = formModel.mobile;
        this.customer.email = formModel.email;
        this.customer.note = formModel.note;
        this.customer.status = formModel.status;
    }

    submit(): void {
        if (this.customerForm.valid) {
            this.updateModel();
            if (this.customer.customerId === 0) {
                this.customerService
                    .insert(this.customer)
                    .then(customer => this.saved.emit(customer));
            } else {
                this.customerService.update(this.customer);
            }
        }
    }

    changeImage(key: string) {
        if (this.customer.customerId > 0) {
            this.customerService.changeImage(this.customer.customerId, key).subscribe(changed => {
                if (changed) {
                    this.customer.imageURL = key;
                }
            });
        } else {
            this.customer.imageURL = key;
        }
    }
}
