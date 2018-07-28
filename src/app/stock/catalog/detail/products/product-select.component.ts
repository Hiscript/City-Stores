import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { GridData } from '../../../../classes/grid-data';
import { ProductService } from '../../../product/services/product.service';
import { SearchService } from '../../../../global/search.service';
import { debounceTime, takeUntil, switchMap, share } from 'rxjs/operators';
import { GridType } from '../../../../classes/grid-type.enum';
import { ProductStatus } from '../../../product/classes/product-status.enum';
import { DeviceService } from '../../../../global/device.service';

@Component({
    templateUrl: './product-select.component.html'
})
export class ProductSelectComponent implements OnInit, OnDestroy {
    products: Observable<GridData>;
    gridType;
    statuses = ProductStatus;
    selected: number[];

    private unsubscribe$ = new Subject();

    constructor(
        public dialogRef: MatDialogRef<ProductSelectComponent>,
        private productService: ProductService,
        private searchService: SearchService,
        public device: DeviceService,
        @Inject(MAT_DIALOG_DATA) public data: number[]
    ) {
        this.gridType = GridType.Product;
        this.selected = this.data;
    }

    ngOnInit() {
        this.products = this.searchService.SearchTerms.pipe(
            debounceTime(500),
            takeUntil(this.unsubscribe$),
            switchMap(terms => this.productService.get(terms)),
            share()
        );
    }

    save() {
        this.dialogRef.close(this.selected);
    }

    close() {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.searchService.clear();
    }
}
