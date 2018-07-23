import { Component, OnInit, ElementRef } from '@angular/core';
import { Product } from '../classes/product';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../../global/device.service';

@Component({
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    product: Product;
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
        this.product = this.route.snapshot.data['product'];
    }

    back(): void {
        this.router.navigate(['/app/stock/products']);
    }
}
