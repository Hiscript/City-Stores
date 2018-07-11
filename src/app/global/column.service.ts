import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { Column } from '../classes/column';
import { GridType } from '../classes/grid-type.enum';

@Injectable({
    providedIn: 'root'
})
export class ColumnService {
    url = 'columns';

    constructor(private dataService: DataService) {}

    get(type: GridType): Observable<Column[]> {
        return this.dataService.get<Column[]>(this.url + '/' + type);
    }

    getFilterColumns(type: GridType): Observable<Column[]> {
        return this.dataService.get<Column[]>(this.url + '/' + type + '/filter');
    }
}
