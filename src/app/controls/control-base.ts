import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export abstract class ControlBase {
    @Input() control: FormControl;
    @Input() required = false;
    @Input() width = '250px';
    @Input() appearance = 'outline';
    @Input() label = '';
    @Input() placeholder = '';
    @Input() hint = '';

    @Input()
    set readonly(r) {
        if (r) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }
}
