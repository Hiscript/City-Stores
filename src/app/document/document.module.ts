import { NgModule } from '@angular/core';
import { ImageComponent } from './image/image.component';
import { MaterialModule } from '../material/material.module';
import { ImageEditorComponent } from './image/editor/image-editor.component';
import { ControlModule } from '../controls/control.module';
import { SharedModule } from '../shared/shared.module';
import { ImageViewerComponent } from './viewers/image-viewer.component';

@NgModule({
    imports: [MaterialModule, ControlModule, SharedModule],
    declarations: [ImageComponent, ImageEditorComponent, ImageViewerComponent],
    exports: [ImageComponent],
    entryComponents: [ImageEditorComponent, ImageViewerComponent]
})
export class DocumentModule {}
