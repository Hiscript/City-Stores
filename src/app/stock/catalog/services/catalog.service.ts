import { Injectable } from '@angular/core';
import { DataService } from '../../../global/data.service';
import { DeviceService } from '../../../global/device.service';
import { SearchTerm } from '../../../classes/search-term';
import { Observable } from 'rxjs';
import { GridData } from '../../../classes/grid-data';
import { Catalog } from '../classes/catalog';
import { first } from 'rxjs/operators';

@Injectable()
export class CatalogService {
    url = 'catalogs';
    constructor(private dataService: DataService, private device: DeviceService) {}

    get(terms: SearchTerm[] = []): Observable<GridData> {
        if (this.device.handset) {
            return this.dataService.get<GridData>(
                this.url + '/m?terms=' + JSON.stringify(terms),
                'search'
            );
        } else {
            return this.dataService.get<GridData>(
                this.url + '?terms=' + JSON.stringify(terms),
                'search'
            );
        }
    }

    detail(catalogId: number): Promise<Catalog> {
        return this.dataService
            .get<Catalog>(this.url + '/' + catalogId.toString(), 'catalog')
            .pipe(first())
            .toPromise();
    }

    insert(catalog: Catalog) {
        return this.dataService
            .post<Catalog>(this.url, catalog, 'catalog')
            .pipe(first())
            .toPromise();
    }

    update(catalog: Catalog) {
        return this.dataService
            .put<Catalog>(this.url, catalog, 'catalog')
            .pipe(first())
            .toPromise();
    }

    patch(catalogId: number, property: string, value: any) {
        return this.dataService.patch(this.url + '/' + catalogId, property, value);
    }
}
