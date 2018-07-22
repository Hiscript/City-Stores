import { NgModule } from '@angular/core';
import { DataRoutingModule } from './data-routing.module';
import { ControlModule } from '../../controls/control.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { DataListComponent } from './list/data-list.component';
import { DataItemComponent } from './list/item/data-item.component';
import { DataTypeComponent } from './list/type/data-type.component';
import { ItemDetailComponent } from './detail/item-detail.component';
import { LovService } from './services/lov.service';
import { DragNDropModule } from '../../material/dragNdrop.Module';

@NgModule({
    imports: [DataRoutingModule, ControlModule, SharedModule, MaterialModule, DragNDropModule],
    declarations: [DataListComponent, DataItemComponent, DataTypeComponent, ItemDetailComponent],
    providers: [LovService],
    entryComponents: [ItemDetailComponent]
})
export class DataModule {}
