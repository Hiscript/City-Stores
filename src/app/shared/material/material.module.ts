import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSnackBarModule,
        MatFormFieldModule
    ],
    exports: [MatButtonModule, MatIconModule, MatInputModule, MatSnackBarModule, MatFormFieldModule]
})
export class MaterialModule {}
