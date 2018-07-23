import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../classes/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { TrackingType } from '../../classes/tracking-type.enum';
import { DropdownType } from '../../../../classes/dropdown-type.enum';

@Component({
    selector: 'product-overview',
    templateUrl: './product-overview.component.html'
})
export class ProductOverviewComponent implements OnInit {
    @Input() product: Product;
    productForm: FormGroup;
    trackingType = TrackingType;
    dropdownType = DropdownType;

    constructor(private productService: ProductService, private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.productForm.patchValue(this.product);
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
}
