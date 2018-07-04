import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class AppHeaderComponent implements OnInit {
    @Output() toggleNav: EventEmitter<any> = new EventEmitter<any>();
    ngOnInit() {}

    toggle(): void {
        this.toggleNav.emit();
    }
}
