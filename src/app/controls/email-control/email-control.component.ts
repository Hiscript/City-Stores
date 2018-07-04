import { Component, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ControlBase } from '../control-base';

@Component({
    selector: 'email-control',
    templateUrl: './email-control.component.html'
})
export class EmailControlComponent extends ControlBase implements AfterViewInit {
    ngAfterViewInit() {
        if (this.required) {
            this.control.setValidators([Validators.required, Validators.email]);
        } else {
            this.control.setValidators([Validators.email]);
        }
    }
}
