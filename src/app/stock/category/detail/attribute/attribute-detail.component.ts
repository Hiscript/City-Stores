import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryAttributeService } from '../../services/category-attribute.service';
import { DropdownType } from '../../../../classes/dropdown-type.enum';
import { CategoryAttributeItem } from '../../classes/category-attribute-item';
import { AttributeType } from '../../classes/attribute-type.enum';

@Component({
    templateUrl: './attribute-detail.component.html'
})
export class AttributeDetailComponent {
    attributeForm: FormGroup;
    dropdownType;
    attributeType;

    constructor(
        private fb: FormBuilder,
        private attributeService: CategoryAttributeService,
        public dialogRef: MatDialogRef<AttributeDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any // categoryId , attribute
    ) {
        this.createForm();
        this.attributeForm.patchValue(this.data.attribute);
        this.dropdownType = DropdownType;
        this.attributeType = AttributeType;

        if (this.data.attribute.items) {
            this.data.attribute.items.forEach(item => {
                this.items.push(this.createItem(item));
            });
        }
    }

    private createForm(): void {
        this.attributeForm = this.fb.group({
            attributeName: [null, Validators.required],
            attributeType: [null],
            items: this.fb.array([])
        });
    }

    private createItem(item: CategoryAttributeItem): FormGroup {
        return this.fb.group({
            categoryAttributeItemId: [item.categoryAttributeItemId, Validators.required],
            itemName: [item.itemName, Validators.required],
            displayOrder: [item.displayOrder, Validators.required]
        });
    }

    get items() {
        return this.attributeForm.get('items') as FormArray;
    }

    addItem(): void {
        const item = new CategoryAttributeItem();
        item.categoryAttributeItemId = 0;
        item.displayOrder = this.items.length + 1;
        this.items.push(this.createItem(item));
    }

    removeItem(i: number): void {
        this.items.removeAt(i);
    }

    private updateModel(): void {
        const formModel = this.attributeForm.getRawValue();
        this.data.attribute.attributeName = formModel.attributeName;
        this.data.attribute.attributeType = formModel.attributeType;
        this.data.attribute.items = formModel.items;
        for (let i = 0; i < this.data.attribute.items.length; i++) {
            this.data.attribute.items[i].displayOrder = i + 1;
        }
    }

    submit(): void {
        if (this.attributeForm.valid) {
            this.updateModel();
            if (this.data.attribute.categoryAttributeId > 0) {
                this.attributeService
                    .update(this.data.categoryId, this.data.attribute)
                    .then(attribute => {
                        this.dialogRef.close(attribute);
                    });
            } else {
                this.attributeService
                    .insert(this.data.categoryId, this.data.attribute)
                    .then(attribute => {
                        this.dialogRef.close(attribute);
                    });
            }
        }
    }

    close(): void {
        this.dialogRef.close();
    }
}
