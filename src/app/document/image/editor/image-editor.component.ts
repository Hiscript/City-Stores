import { Component, Inject, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Cropper from 'cropperjs';
import { UserSettingService } from '../../../global/user-setting.service';

@Component({
    templateUrl: './image-editor.component.html'
})
export class ImageEditorComponent {
    @ViewChild('image') image: ElementRef;
    @ViewChild('thumb') thumb: ElementRef;
    @ViewChild('icon') icon: ElementRef;

    cropper: Cropper;

    constructor(
        public dialogRef: MatDialogRef<ImageEditorComponent>,
        public userSettings: UserSettingService,
        @Inject(MAT_DIALOG_DATA) public data: File
    ) {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = (event: any) => {
            this.image.nativeElement.src = event.target.result;
            this.initCropper();
        };
    }

    initCropper() {
        this.cropper = new Cropper(this.image.nativeElement, {
            aspectRatio: this.userSettings.defaultAspectRatio,
            preview: [this.thumb.nativeElement, this.icon.nativeElement]
        });
    }

    done() {
        const originalUrl = this.cropper.getCroppedCanvas().toDataURL('image/jpeg');
        const thumbUrl = this.cropper.getCroppedCanvas({ width: 250 }).toDataURL('image/jpeg');
        const iconUrl = this.cropper.getCroppedCanvas({ width: 40 }).toDataURL('image/jpeg');

        const original = this.dataURItoBlob(originalUrl);
        const thumb = this.dataURItoBlob(thumbUrl);
        const icon = this.dataURItoBlob(iconUrl);

        this.dialogRef.close({ original: original, thumb: thumb, icon: icon });
    }

    back() {
        this.dialogRef.close();
    }

    setAspectRatio(e: number) {
        this.userSettings.defaultAspectRatio = e;
        this.cropper.setAspectRatio(+e);
    }

    private dataURItoBlob(dataURI) {
        const binary = atob(dataURI.split(',')[1]);
        const array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
    }
}
