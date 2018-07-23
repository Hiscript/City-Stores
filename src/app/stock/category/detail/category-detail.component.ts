import { Component, OnInit, ElementRef } from '@angular/core';
import { Category } from '../classes/category';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { DeviceService } from '../../../global/device.service';

@Component({
    templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit {
    category: Category;
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
            if (device.handset && this.tabIndex < 1) {
                this.tabIndex += 1;
            }
        });
    }

    ngOnInit(): void {
        this.category = this.route.snapshot.data['category'];
    }

    back(): void {
        this.router.navigate(['/app/stock/categories']);
    }
}
