import { Component, Input, OnInit } from '@angular/core';
import { ControlBase } from '../control-base';

@Component({
    selector: 'text-control',
    templateUrl: './text-control.component.html'
})
export class TextControlComponent extends ControlBase implements OnInit {
    @Input() maxlength = 100;
    @Input() type = 'text';
    @Input() suffix = '';

    ngOnInit() {}
}
