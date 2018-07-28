import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {
    ErrorMessagePipe,
    EmailControlComponent,
    PhoneControlComponent,
    TextControlComponent,
    TextAreaControlComponent,
    ListControlComponent,
    FilterControlComponent,
    DropdownControlComponent,
    DecimalControlComponent,
    NumberControlComponent,
    CategoryControlComponent,
    AttributeControlComponent,
    StatusControlComponent
} from '.';
import { MaterialModule } from '../material/material.module';
import { GridControlComponent } from './grid-control/grid-control.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        MatSidenavModule,
        MatPaginatorModule,
        MatSortModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        // pipes
        ErrorMessagePipe,

        // controls
        TextControlComponent,
        TextAreaControlComponent,
        EmailControlComponent,
        PhoneControlComponent,
        GridControlComponent,
        ListControlComponent,
        FilterControlComponent,
        DropdownControlComponent,
        DecimalControlComponent,
        NumberControlComponent,
        CategoryControlComponent,
        AttributeControlComponent,
        StatusControlComponent
    ],
    exports: [
        // controls
        TextControlComponent,
        TextAreaControlComponent,
        EmailControlComponent,
        PhoneControlComponent,
        GridControlComponent,
        ListControlComponent,
        FilterControlComponent,
        DropdownControlComponent,
        DecimalControlComponent,
        NumberControlComponent,
        CategoryControlComponent,
        AttributeControlComponent,
        StatusControlComponent,

        // modules
        CommonModule,
        ReactiveFormsModule
    ],
    providers: []
})
export class ControlModule {}
