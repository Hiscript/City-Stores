import { Component, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ControlBase } from '../control-base';
import { AppSettings } from '../../app.settings';

@Component({
    selector: 'number-control',
    templateUrl: './number-control.component.html'
})
export class NumberControlComponent extends ControlBase implements AfterViewInit {
    @Input() allowNagative = false;

    numberPattern: string = AppSettings.Number_Pattern;
    positiveNumberPattern: string = AppSettings.Positive_Number_Pattern;

    ngAfterViewInit() {
        if (this.required) {
            this.control.setValidators([
                Validators.required,
                Validators.pattern(
                    this.allowNagative ? this.numberPattern : this.positiveNumberPattern
                )
            ]);
        } else {
            this.control.setValidators([
                Validators.pattern(
                    this.allowNagative ? this.numberPattern : this.positiveNumberPattern
                )
            ]);
        }
    }
}
