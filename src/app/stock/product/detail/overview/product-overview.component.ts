import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../classes/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { TrackingType } from '../../classes/tracking-type.enum';
import { DropdownType } from '../../../../classes/dropdown-type.enum';
import { ProductStatus } from '../../classes/product-status.enum';
import { MatDialog } from '@angular/material/dialog';
import { ProductAdjustmentComponent } from './adjustment/product-adjustment.component';
import { ProductStockService } from '../../services/product-stock.service';
import { ProductStock } from '../../classes/product-stock';

@Component({
    selector: 'product-overview',
    templateUrl: './product-overview.component.html'
})
export class ProductOverviewComponent implements OnInit {
    @Input() product: Product;
    productForm: FormGroup;
    stock: ProductStock;

    statuses = ProductStatus;
    trackingType = TrackingType;
    dropdownType = DropdownType;

    constructor(
        private productService: ProductService,
        private stockService: ProductStockService,
        private fb: FormBuilder,
        public dialog: MatDialog
    ) {
        this.createForm();
    }

    ngOnInit() {
        this.productForm.patchValue(this.product);
        this.refreshStock();
    }

    private refreshStock() {
        if (this.product.productId > 0) {
            this.stockService.getStock(this.product.productId).then(stock => (this.stock = stock));
        }
    }

    private createForm(): void {
        this.productForm = this.fb.group({
            sku: [null, Validators.required],
            productName: [null, Validators.required],
            categoryId: [null, Validators.required],
            measurementUnitId: [null, Validators.required],
            minQuantity: [null],
            maxQuantity: [null]
        });
    }

    private updateModel(): void {
        const formModel = this.productForm.getRawValue();
        this.product.sku = formModel.sku;
        this.product.productName = formModel.productName;
        this.product.categoryId = formModel.categoryId;
        this.product.trackingType = formModel.trackingType;
        this.product.measurementUnitId = formModel.measurementUnitId;
        this.product.weightCategoryId = formModel.weightCategoryId;
        this.product.minQuantity = formModel.minQuantity;
        this.product.maxQuantity = formModel.maxQuantity;
    }

    submit(): void {
        if (this.productForm.valid) {
            this.updateModel();
            if (this.product.productId > 0) {
                this.productService.update(this.product);
            } else {
                this.productService.insert(this.product).then(product => (this.product = product));
            }
        }
    }

    statusChange(status: number) {
        if (this.product.productId > 0) {
            this.productService
                .patch(this.product.productId, 'status', status)
                .subscribe(changed => {
                    if (changed) {
                        this.product.status = status;
                    }
                });
        }
    }

    changeImage(key: string) {
        if (this.product.productId > 0) {
            this.productService.changeImage(this.product.productId, key).subscribe(changed => {
                if (changed) {
                    this.product.imageURL = key;
                }
            });
        } else {
            this.product.imageURL = key;
        }
    }

    openAdjustment() {
        if (this.product.productId > 0) {
            const dialogRef = this.dialog.open(ProductAdjustmentComponent, {
                panelClass: ['full-sm-dialog', 'single'],
                data: {
                    stock: this.stock,
                    productId: this.product.productId
                }
            });

            dialogRef.afterClosed().subscribe(changed => {
                if (changed) {
                    this.refreshStock();
                }
            });
        }
    }
}
