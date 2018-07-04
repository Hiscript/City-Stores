import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {
    ErrorMessagePipe,
    EmailControlComponent,
    PhoneControlComponent,
    TextControlComponent
} from './';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule
    ],
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
        ReactiveFormsModule,
        MatButtonModule
    ],
    providers: []
})
export class ControlModule {}
