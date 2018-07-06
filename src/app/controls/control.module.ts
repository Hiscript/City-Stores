import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
    ErrorMessagePipe,
    EmailControlComponent,
    PhoneControlComponent,
    TextControlComponent
} from './';
import { MaterialModule } from '../material/material.module';


@NgModule({
    imports: [CommonModule, MaterialModule, ReactiveFormsModule],
    declarations: [
        // pipes
        ErrorMessagePipe,
        // controls
        TextControlComponent,
        EmailControlComponent,
        PhoneControlComponent
    ],
    exports: [
        // controls
        TextControlComponent,
        EmailControlComponent,
        PhoneControlComponent,
        // modules
        CommonModule,
        ReactiveFormsModule
    ],
    providers: []
})
export class ControlModule {}
