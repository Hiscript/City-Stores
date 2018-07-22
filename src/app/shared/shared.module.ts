import { NgModule } from '@angular/core';
import {
    StatusPipe,
    CurrencyStringPipe,
    DateStringPipe,
    DateTimeStringPipe,
    QuantityStringPipe,
    GroupFilterPipe
} from './pipes';
import { LoadingButtonDirective, LoadingBarDirective, StatusDirective } from './directives';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeleteConfirmComponent } from './components';
import { MaterialModule } from '../material/material.module';

@NgModule({
    imports: [FlexLayoutModule, MaterialModule],
    declarations: [
        // directives
        LoadingButtonDirective,
        LoadingBarDirective,
        StatusDirective,
        // pipes
        StatusPipe,
        CurrencyStringPipe,
        DateStringPipe,
        DateTimeStringPipe,
        QuantityStringPipe,
        GroupFilterPipe,
        // components
        DeleteConfirmComponent
    ],
    exports: [
        FlexLayoutModule,
        // directives
        LoadingButtonDirective,
        LoadingBarDirective,
        StatusDirective,
        // pipes
        StatusPipe,
        CurrencyStringPipe,
        DateStringPipe,
        DateTimeStringPipe,
        QuantityStringPipe,
        GroupFilterPipe,
        // components
        DeleteConfirmComponent
    ],
    providers: [],
    entryComponents: [DeleteConfirmComponent]
})
export class SharedModule {}
