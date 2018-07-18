import { NgModule } from '@angular/core';
import {
    StatusPipe,
    CurrencyStringPipe,
    DateStringPipe,
    DateTimeStringPipe,
    QuantityStringPipe
} from './pipes';
import { LoadingButtonDirective, LoadingBarDirective, StatusDirective } from './directives';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [FlexLayoutModule],
    declarations: [
        LoadingButtonDirective,
        LoadingBarDirective,
        StatusDirective,

        StatusPipe,
        CurrencyStringPipe,
        DateStringPipe,
        DateTimeStringPipe,
        QuantityStringPipe
    ],
    exports: [
        FlexLayoutModule,

        LoadingButtonDirective,
        LoadingBarDirective,
        StatusDirective,

        StatusPipe,
        CurrencyStringPipe,
        DateStringPipe,
        DateTimeStringPipe,
        QuantityStringPipe
    ],
    providers: []
})
export class SharedModule {}
