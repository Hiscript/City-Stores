import { NgModule } from '@angular/core';
import {
    StatusPipe,
    CurrencyStringPipe,
    DateStringPipe,
    DateTimeStringPipe,
    QuantityStringPipe
} from './pipes';
import { LoadingDirective, StatusDirective } from './directives';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [FlexLayoutModule],
    declarations: [
        LoadingDirective,
        StatusDirective,

        StatusPipe,
        CurrencyStringPipe,
        DateStringPipe,
        DateTimeStringPipe,
        QuantityStringPipe
    ],
    exports: [
        FlexLayoutModule,

        LoadingDirective,
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
