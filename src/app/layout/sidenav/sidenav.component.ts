import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../classes/menu';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-nav',
    templateUrl: './sidenav.component.html',
    providers: [MenuService]
})
export class AppNavComponent implements OnInit {
    openParent = null;
    menus: Observable<Menu[]>;

    constructor(private menuService: MenuService) {}

    ngOnInit() {
        this.menus = this.menuService.get();
    }

    open(menu: string) {
        if (this.openParent != menu) this.openParent = menu;
        else this.openParent = null;
    }
}
