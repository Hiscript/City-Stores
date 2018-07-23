import { ControlBase } from '../control-base';
import { Component, Input, OnInit } from '@angular/core';
import { DropdownType } from '../../classes/dropdown-type.enum';
import { DropdownService } from '../../global/dropdown.service';
import { DropdownData } from '../../classes/dropdown-data';

@Component({
    selector: 'dropdown-control',
    templateUrl: './dropdown-control.component.html'
})
export class DropdownControlComponent extends ControlBase implements OnInit {
    @Input() dropdownType: DropdownType;
    @Input() forFilter = false;
    @Input() returnObject = false;
    @Input() autoReset = false;

    @Input() data: any;

    items: DropdownData[];

    constructor(private dropdownService: DropdownService) {
        super();
    }

    ngOnInit() {
        if (this.dropdownType) {
            this.dropdownService.get(this.dropdownType).subscribe(data => {
                this.items = data;
                this.setDefault();
            });
        } else {
            // Convert enum to array
            this.items = Object.keys(this.data)
                .filter(key => typeof this.data[key] === 'number')
                .map(
                    key =>
                        <DropdownData>{
                            id: this.data[key],
                            name: key,
                            isDefault: this.data[key] === 1
                        }
                );

            this.setDefault();
        }
    }

    setDefault() {
        if (this.required) {
            if (this.items.length === 1) {
                this.control.setValue(this.returnObject ? this.items[0] : this.items[0].id);
                this.control.disable();
            } else if (!this.control.value && this.items.filter(x => x.isDefault).length > 0) {
                this.control.setValue(
                    this.returnObject
                        ? this.items.filter(x => x.isDefault)[0]
                        : this.items.filter(x => x.isDefault)[0].id
                );
            }
        }
    }
}
