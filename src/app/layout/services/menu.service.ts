import { Injectable } from '@angular/core';
import { Menu } from '../classes/menu';
import { Observable } from 'rxjs';
import { DataService } from '../../global/data.service';

@Injectable()
export class MenuService {
    url = 'menus';
    constructor(private dataService: DataService) {}

    get(): Observable<Menu[]> {
        return this.dataService.get<Menu[]>(this.url);
    }
}
