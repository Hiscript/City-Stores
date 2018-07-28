import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'status-control',
    templateUrl: './status-control.component.html'
})
export class StatusControlComponent implements OnInit {
    @Input() statusId: number;
    @Input() enum: any;
    @Output() changed: EventEmitter<number> = new EventEmitter<number>();

    statuses: any;

    ngOnInit() {
        if (this.enum) {
            this.statuses = Object.keys(this.enum)
                .filter(key => typeof this.enum[key] === 'number')
                .map(key => ({
                    id: this.enum[key],
                    name: key
                }));
        }
    }

    change(statusId: number) {
        if (statusId !== this.statusId) {
            this.changed.emit(statusId);
        }
    }
}
