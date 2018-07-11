import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../global/data.service';
import { GridData } from '../../classes/grid-data';
import { SearchTerm } from '../../classes/search-term';
import { DeviceService } from '../../global/device.service';

@Injectable()
export class CustomerService {
    url = 'customers';
    constructor(private dataService: DataService, private device: DeviceService) {}

    get(terms: SearchTerm[] = []): Observable<GridData> {
        if (this.device.handset) {
            return this.dataService.get<GridData>(this.url + '/m?terms=' + JSON.stringify(terms));
        } else {
            return this.dataService.get<GridData>(this.url + '?terms=' + JSON.stringify(terms));
        }
    }
}
