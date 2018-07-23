import { ControlBase } from '../control-base';
import { Component, Input, OnInit } from '@angular/core';
import { DropdownType } from '../../classes/dropdown-type.enum';
import { DropdownService } from '../../global/dropdown.service';
import { DropdownData } from '../../classes/dropdown-data';

@Component({
    selector: 'category-control',
    templateUrl: './category-control.component.html'
})
export class CategoryControlComponent extends ControlBase implements OnInit {
    @Input() forFilter = false;

    items: DropdownData[];
    groups: string[];

    constructor(private dropdownService: DropdownService) {
        super();
    }

    ngOnInit() {
        this.dropdownService.get(DropdownType.Category).subscribe(data => {
            this.items = data;
            this.setGroup();
        });
    }

    private setGroup(): void {
        this.groups = this.items
            .map(a => a.group)
            .filter((x, i, a) => x && a.indexOf(x) === i)
            .sort();
    }
}
