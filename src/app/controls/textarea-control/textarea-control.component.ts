import { Component, Input } from '@angular/core';
import { ControlBase } from '../control-base';

@Component({
    selector: 'textarea-control',
    templateUrl: './textarea-control.component.html'
})
export class TextAreaControlComponent extends ControlBase {
    @Input() rows: number = null;
}
