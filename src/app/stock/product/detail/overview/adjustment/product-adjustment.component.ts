import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductStockService } from '../../../services/product-stock.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductAdjustment } from '../../../classes/product-adjustment';
import { DropdownType } from '../../../../../classes/dropdown-type.enum';

@Component({
    templateUrl: './product-adjustment.component.html'
})
export class ProductAdjustmentComponent {
    adjustmentForm: FormGroup;
    adjustment: ProductAdjustment;
    dropdownType = DropdownType;

    constructor(
        private fb: FormBuilder,
        private stockService: ProductStockService,
        public dialogRef: MatDialogRef<ProductAdjustmentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any // stock, productId
    ) {
        this.createForm();
    }

    private createForm(): void {
        this.adjustmentForm = this.fb.group({
            adjustmentReasonId: ['', Validators.required],
            quantity: ['', Validators.required],
            // amount: ['', Validators.required],
            notes: ['']
        });
    }

    private updateModel(): void {
        this.adjustment = new ProductAdjustment();
        const formModel = this.adjustmentForm.getRawValue();
        this.adjustment.adjustmentReasonId = formModel.adjustmentReasonId;
        this.adjustment.quantity = formModel.quantity;
        this.adjustment.amount = formModel.amount;
        this.adjustment.notes = formModel.notes;
    }

    submit(): void {
        if (this.adjustmentForm.valid) {
            this.updateModel();
            this.stockService
                .productAdjustment(this.data.productId, this.adjustment)
                .then(adjusted => {
                    this.dialogRef.close(adjusted);
                });
        }
    }

    close(): void {
        this.dialogRef.close();
    }
}
