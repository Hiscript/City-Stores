import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from '../../global/document.service';

@Component({
    templateUrl: './image-viewer.component.html'
})
export class ImageViewerComponent {
    imageURL: string;

    constructor(
        public dialogRef: MatDialogRef<ImageViewerComponent>,
        private documentService: DocumentService,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) {
        if (this.data) {
            this.imageURL = this.documentService.getURL(this.data);
        }
    }

    back() {
        this.dialogRef.close();
    }
}
