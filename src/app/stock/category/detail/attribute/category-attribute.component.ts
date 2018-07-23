import { Component, OnInit, Input } from '@angular/core';
import { CategoryAttribute } from '../../classes/category-attribute';
import { MatDialog } from '../../../../../../node_modules/@angular/material/dialog';
import { CategoryAttributeService } from '../../services/category-attribute.service';
import { AttributeDetailComponent } from './attribute-detail.component';
import { ChangeOrder } from '../../../../classes/change-order';

@Component({
    selector: 'category-attribute',
    templateUrl: './category-attribute.component.html'
})
export class CategoryAttributeComponent implements OnInit {
    @Input() categoryId: number;

    attributes: CategoryAttribute[] = [];
    activeParent: boolean;

    constructor(public dialog: MatDialog, private attributeService: CategoryAttributeService) {}

    ngOnInit() {
        if (this.categoryId) {
            this.refreshItems();
        }
    }

    add(parentId: number = null) {
        const attribute = new CategoryAttribute();
        attribute.parentId = parentId;
        if (parentId) {
            const items = this.attributes.filter(x => x.categoryAttributeId === parentId)[0]
                .childAttributes;
            attribute.displayOrder = items ? items.length + 1 : 1;
        } else {
            attribute.displayOrder = this.attributes ? this.attributes.length + 1 : 1;
        }
        this.openDetailDialog(attribute);
    }

    edit(attributeId: number) {
        this.attributeService.detail(this.categoryId, attributeId).then(attribute => {
            this.openDetailDialog(attribute);
        });
    }

    delete(attributeId: number) {
        this.attributeService.delete(this.categoryId, attributeId).subscribe(deleted => {
            if (deleted) {
                this.refreshItems();
            }
        });
    }

    changeOrder(item: CategoryAttribute, to: number): void {
        console.log(item);
        const change = new ChangeOrder(item.displayOrder, to, item.parentId);
        this.attributeService.changeOrder(this.categoryId, change).then(changed => {
            if (changed) {
                this.refreshItems();
            }
        });
    }

    private openDetailDialog(attribute: CategoryAttribute) {
        const dialogRef = this.dialog.open(AttributeDetailComponent, {
            panelClass: ['full-sm-dialog', 'single'],
            data: { categoryId: this.categoryId, attribute: attribute }
        });

        dialogRef.afterClosed().subscribe(changed => {
            if (changed) {
                this.refreshItems();
            }
        });
    }

    private refreshItems() {
        this.attributeService
            .get(this.categoryId)
            .subscribe(attributes => (this.attributes = attributes));
    }
}
