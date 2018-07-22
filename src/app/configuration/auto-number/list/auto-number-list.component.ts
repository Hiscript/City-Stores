import { Component, OnInit } from '@angular/core';
import { AutoNumber } from '../classes/auto-number';
import { AutoNumberService } from '../services/auto-number.service';
import { MatDialog } from '@angular/material/dialog';
import { AutoNumberDetailComponent } from '../detail/auto-number-detail.component';

@Component({
    templateUrl: './auto-number-list.component.html'
})
export class AutoNumberListComponent implements OnInit {
    autoNumbers: AutoNumber[];

    constructor(private autoNumberService: AutoNumberService, public dialog: MatDialog) {}

    ngOnInit() {
        this.autoNumberService.get().subscribe(numbers => {
            this.autoNumbers = numbers;
            this.setPreview();
        });
    }

    edit(number: AutoNumber) {
        this.openDetailDialog(number);
    }

    private setPreview() {
        for (let i = 0; i < this.autoNumbers.length; i++) {
            const item = this.autoNumbers[i];
            item.preview = item.prefix + this.pad(item.lastNumber.toString(), item.digit);
        }
    }

    private pad(s: string, size: number): string {
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    }

    private openDetailDialog(number: AutoNumber) {
        const dialogRef = this.dialog.open(AutoNumberDetailComponent, {
            panelClass: ['full-sm-dialog', 'single'],
            data: number
        });

        dialogRef.afterClosed().subscribe(changed => {
            if (changed) {
                this.ngOnInit();
            }
        });
    }
}
