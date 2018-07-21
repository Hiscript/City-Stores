import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { DropdownData } from '../classes/dropdown-data';
import { DropdownType } from '../classes/dropdown-type.enum';

@Injectable({
    providedIn: 'root'
})
export class DropdownService {
    url = 'dropdown';

    constructor(private dataService: DataService) {}

    get(type: DropdownType): Observable<DropdownData[]> {
        return this.dataService.get<DropdownData[]>(this.url + '/' + type);
    }
}
