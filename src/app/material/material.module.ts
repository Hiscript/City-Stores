import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    imports: [
        MatTooltipModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatInputModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatTableModule,
        MatSelectModule,
        MatListModule,
        MatProgressBarModule,
        MatToolbarModule,
        MatTabsModule,
        MatDialogModule
    ],
    exports: [
        MatTooltipModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatInputModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatTableModule,
        MatSelectModule,
        MatListModule,
        MatProgressBarModule,
        MatToolbarModule,
        MatTabsModule,
        MatDialogModule
    ]
})
export class MaterialModule {}
