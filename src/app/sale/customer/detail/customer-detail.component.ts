import { Component, OnInit, ElementRef } from '@angular/core';
import { Customer } from '../classes/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../../global/device.service';

@Component({
    templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent implements OnInit {
    customer: Customer;
    tabIndex = 0;
    constructor(
        elementRef: ElementRef,
        private route: ActivatedRoute,
        private router: Router,
        public device: DeviceService
    ) {
        const hammertime = new Hammer(elementRef.nativeElement, {
            touchAction: 'auto',
            inputClass: Hammer.TouchMouseInput
        });

        hammertime.on('swiperight', e => {
            if (device.handset && this.tabIndex > 0) {
                this.tabIndex -= 1;
            }
        });
        hammertime.on('swipeleft', e => {
            if (device.handset && this.tabIndex < 4) {
                this.tabIndex += 1;
            }
        });
    }

    ngOnInit(): void {
        this.customer = this.route.snapshot.data['customer'];
    }

    back(): void {
        this.router.navigate(['/app/sale/customers']);
    }
}
