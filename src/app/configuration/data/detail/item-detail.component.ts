import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LovService } from '../services/lov.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './item-detail.component.html'
})
export class ItemDetailComponent {
    itemForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private lovService: LovService,
        public dialogRef: MatDialogRef<ItemDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any // typeId , item
    ) {
        this.createForm();
        this.itemForm.patchValue(this.data.item);
    }

    private createForm(): void {
        this.itemForm = this.fb.group({
            lovItemName: [null, Validators.required],
            costTypeId: [null]
        });
    }

    private updateModel(): void {
        const formModel = this.itemForm.getRawValue();
        this.data.item.lovItemName = formModel.lovItemName;
        this.data.item.costTypeId = formModel.costTypeId;
    }

    submit(): void {
        if (this.itemForm.valid) {
            this.updateModel();
            if (this.data.item.lovItemId > 0) {
                this.lovService.update(this.data.typeId, this.data.item).then(item => {
                    this.dialogRef.close(item);
                });
            } else {
                this.lovService.insert(this.data.typeId, this.data.item).then(item => {
                    this.dialogRef.close(item);
                });
            }
        }
    }

    close(): void {
        this.dialogRef.close();
    }
}
