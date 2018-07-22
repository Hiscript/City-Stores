import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoNumberService } from '../services/auto-number.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutoNumber } from '../classes/auto-number';

@Component({
    templateUrl: './auto-number-detail.component.html'
})
export class AutoNumberDetailComponent implements OnInit {
    autoNumberForm: FormGroup;
    preview: string;

    constructor(
        private fb: FormBuilder,
        private autoNumberService: AutoNumberService,
        public dialogRef: MatDialogRef<AutoNumberDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AutoNumber
    ) {
        this.createForm();
        this.autoNumberForm.patchValue(this.data);
    }

    ngOnInit() {}

    private createForm(): void {
        this.autoNumberForm = this.fb.group({
            prefix: [null, Validators.required],
            digit: [null, Validators.required],
            lastNumber: [null, Validators.required]
        });
        this.autoNumberForm.valueChanges.subscribe(number => {
            this.setPreview(number);
        });
    }

    private updateModel(): void {
        const formModel = this.autoNumberForm.value;
        this.data.prefix = formModel.prefix;
        this.data.digit = formModel.digit;
    }

    submit(): void {
        if (this.autoNumberForm.valid) {
            this.updateModel();
            this.autoNumberService.update(this.data).then(number => {
                if (number) {
                    this.dialogRef.close(number);
                }
            });
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    private setPreview(number: AutoNumber) {
        if (number && number.lastNumber) {
            this.preview = number.prefix + this.pad(number.lastNumber.toString(), number.digit);
        }
    }

    private pad(s: string, size: number): string {
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    }
}
