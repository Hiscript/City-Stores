import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './delete-confirm.component.html'
})
export class DeleteConfirmComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any // title, description, button
    ) {}

    confirm() {
        this.dialogRef.close(true);
    }

    close() {
        this.dialogRef.close(false);
    }
}
