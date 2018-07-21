import {
    Component,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageEditorComponent } from './editor/image-editor.component';
import { DocumentService } from '../../global/document.service';
import { ImageViewerComponent } from '../viewers/image-viewer.component';

@Component({
    selector: 'single-image',
    templateUrl: './image.component.html'
})
export class ImageComponent implements OnChanges {
    @Input() entity: string;
    @Input() key: string;
    @ViewChild('fileInput') fileInput: ElementRef;
    @Output() updated: EventEmitter<string> = new EventEmitter<string>();

    imageURL: string;

    constructor(private dialog: MatDialog, private documentService: DocumentService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['key']) {
            this.key = changes['key'].currentValue;
            if (this.key) {
                this.imageURL = this.documentService.getThumbURL(this.key);
            } else {
                this.imageURL = null;
            }
        }
    }

    onFileChanged(event) {
        const dialogRef = this.dialog.open(ImageEditorComponent, {
            panelClass: 'full-dialog',
            data: event.target.files[0]
        });

        dialogRef.afterClosed().subscribe(image => {
            if (image) {
                this.documentService
                    .upload(
                        this.entity,
                        event.target.files[0].name,
                        image.original,
                        image.thumb,
                        image.icon
                    )
                    .then(key => {
                        this.fileInput.nativeElement.value = '';
                        this.updated.emit(key);
                    });
            } else {
                this.fileInput.nativeElement.value = '';
            }
        });
    }

    view() {
        const dialogRef = this.dialog.open(ImageViewerComponent, {
            panelClass: ['full-dialog', 'no-action'],
            data: this.key
        });
    }

    remove() {
        this.updated.emit('');
    }
}
