import { NgModule } from '@angular/core';
import { DndModule, SortableComponent } from 'ng2-dnd';
import { DragDropService, DragDropConfig, DragDropSortableService } from 'ng2-dnd';

@NgModule({
    imports: [DndModule],
    exports: [DndModule],
    providers: [DragDropService, DragDropConfig, DragDropSortableService, SortableComponent]
})
export class DragNDropModule {}
