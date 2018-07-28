import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatalogService } from '../../services/catalog.service';
import { Catalog } from '../../classes/catalog';
import { CatalogStatus } from '../../classes/catalog-status.enum';

@Component({
    templateUrl: './catalog-edit.component.html'
})
export class CatalogEditComponent {
    catalogForm: FormGroup;
    statuses = CatalogStatus;

    constructor(
        private fb: FormBuilder,
        private catalogService: CatalogService,
        public dialogRef: MatDialogRef<CatalogEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Catalog
    ) {
        this.createForm();
        this.catalogForm.patchValue(this.data);
    }

    private createForm(): void {
        this.catalogForm = this.fb.group({
            catalogName: ['', Validators.required],
            status: ['', Validators.required]
        });
    }

    private updateModel(): void {
        const formModel = this.catalogForm.getRawValue();
        this.data.catalogName = formModel.catalogName;
        this.data.status = formModel.status;
    }

    submit(): void {
        if (this.catalogForm.valid) {
            this.updateModel();
            if (this.data.catalogId > 0) {
                this.catalogService.update(this.data).then(catalog => {
                    this.dialogRef.close(catalog);
                });
            } else {
                this.catalogService.insert(this.data).then(catalog => {
                    this.dialogRef.close(catalog);
                });
            }
        }
    }

    close(): void {
        this.dialogRef.close();
    }
}
