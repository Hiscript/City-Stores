import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GridData } from '../../../classes/grid-data';
import { GridType } from '../../../classes/grid-type.enum';
import { SearchService } from '../../../global/search.service';
import { debounceTime, switchMap, takeUntil, finalize, share } from 'rxjs/operators';
import { DeviceService } from '../../../global/device.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductStatus } from '../classes/product-status.enum';

@Component({
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {
    products: Observable<GridData>;
    gridType = GridType.Product;
    statuses = ProductStatus;

    private unsubscribe$ = new Subject();

    constructor(
        private router: Router,
        private productService: ProductService,
        private searchService: SearchService,
        public device: DeviceService
    ) {}

    ngOnInit() {
        this.products = this.searchService.SearchTerms.pipe(
            debounceTime(500),
            takeUntil(this.unsubscribe$),
            switchMap(terms => this.productService.get(terms)),
            share()
        );
    }

    add() {
        this.router.navigate(['/app/stock/products/new']);
    }

    select(productId: number): void {
        this.router.navigate(['/app/stock/products', productId]);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.searchService.clear();
    }
}
