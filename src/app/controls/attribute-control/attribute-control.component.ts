import { Component, OnInit, Input } from '@angular/core';
import { ControlBase } from '../control-base';
import { CategoryAttributeItemService } from '../../stock/category/services/category-attribute-item.service';
import { CategoryAttributeItem } from '../../stock/category/classes/category-attribute-item';

@Component({
    selector: 'attribute-control',
    templateUrl: './attribute-control.component.html'
})
export class AttributeControlComponent extends ControlBase implements OnInit {
    @Input() attributeId: number;
    items: CategoryAttributeItem[];

    constructor(private attributeService: CategoryAttributeItemService) {
        super();
    }

    ngOnInit() {
        if (this.attributeId) {
            this.attributeService.get(this.attributeId).subscribe(items => {
                this.items = items;
            });
        }
    }
}
