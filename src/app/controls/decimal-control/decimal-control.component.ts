import { Component, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ControlBase } from '../control-base';
import { AppSettings } from '../../app.settings';

@Component({
    selector: 'decimal-control',
    templateUrl: './decimal-control.component.html'
})
export class DecimalControlComponent extends ControlBase implements AfterViewInit {
    @Input() allowNagative = false;
    @Input() isPercentage = false;

    numberPattern: string = AppSettings.Decimal_Pattern;
    positiveNumberPattern: string = AppSettings.Positive_Decimal_Pattern;

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
