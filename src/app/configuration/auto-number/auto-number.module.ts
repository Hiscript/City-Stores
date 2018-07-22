import { NgModule } from '@angular/core';
import { AutoNumberRoutingModule } from './auto-number-routing.module';
import { ControlModule } from '../../controls/control.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { AutoNumberListComponent } from './list/auto-number-list.component';
import { AutoNumberDetailComponent } from './detail/auto-number-detail.component';
import { AutoNumberService } from './services/auto-number.service';

@NgModule({
    imports: [AutoNumberRoutingModule, ControlModule, SharedModule, MaterialModule],
    declarations: [AutoNumberListComponent, AutoNumberDetailComponent],
    providers: [AutoNumberService],
    entryComponents: [AutoNumberDetailComponent]
})
export class AutoNumberModule {}
