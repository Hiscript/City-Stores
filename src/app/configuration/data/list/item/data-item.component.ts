import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LovService } from '../../services/lov.service';
import { LovItem } from '../../classes/lov-item';
import { ItemDetailComponent } from '../../detail/item-detail.component';
import { ChangeOrder } from '../../../../classes/change-order';

@Component({
    templateUrl: './data-item.component.html'
})
export class DataItemComponent implements OnInit {
    typeName;
    typeId;
    items: LovItem[];

    constructor(
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private lovService: LovService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(p => {
            this.typeName = p['name'];
            this.typeId = +p['id'];
            this.refreshItems();
        });
    }

    add() {
        const item = new LovItem();
        item.displayOrder = this.items.length + 1;
        this.openDetailDialog(item);
    }

    edit(itemId: number) {
        this.lovService.detail(this.typeId, itemId).then(item => {
            this.openDetailDialog(item);
        });
    }

    delete(itemId: number) {
        this.lovService.delete(this.typeId, itemId).subscribe(deleted => {
            if (deleted) {
                this.refreshItems();
            }
        });
    }

    setDefault(itemId: number) {
        this.lovService.setDefault(this.typeId, itemId).then(changed => {
            if (changed) {
                this.refreshItems();
            }
        });
    }

    changeOrder(item: LovItem, to: number): void {
        const change = new ChangeOrder(item.displayOrder, to);
        this.lovService.changeOrder(this.typeId, change).then(changed => {
            if (changed) {
                this.refreshItems();
            }
        });
    }

    private refreshItems() {
        this.lovService.getItems(this.typeId).subscribe(items => (this.items = items));
    }

    private openDetailDialog(item: LovItem) {
        const dialogRef = this.dialog.open(ItemDetailComponent, {
            panelClass: ['full-sm-dialog', 'single'],
            data: { typeId: this.typeId, item: item }
        });

        dialogRef.afterClosed().subscribe(changed => {
            if (changed) {
                this.refreshItems();
            }
        });
    }
}
