import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-nav',
    templateUrl: './sidenav.component.html'
})
export class AppNavComponent implements OnInit {
    openParent = null;
    ngOnInit() {}

    open(menu: string) {
        if (this.openParent != menu) this.openParent = menu;
        else this.openParent = null;
    }
}
