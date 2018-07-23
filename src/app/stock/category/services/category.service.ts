import { Injectable } from '@angular/core';
import { DataService } from '../../../global/data.service';
import { DeviceService } from '../../../global/device.service';
import { Observable } from 'rxjs';
import { GridData } from '../../../classes/grid-data';
import { SearchTerm } from '../../../classes/search-term';
import { Category } from '../classes/category';
import { first } from 'rxjs/operators';

@Injectable()
export class CategoryService {
    url = 'categories';
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

    detail(categoryId: number): Promise<Category> {
        return this.dataService
            .get<Category>(this.url + '/' + categoryId.toString(), 'category')
            .pipe(first())
            .toPromise();
    }

    insert(category: Category) {
        return this.dataService
            .post<Category>(this.url, category, 'category')
            .pipe(first())
            .toPromise();
    }

    update(category: Category) {
        return this.dataService
            .put<Category>(this.url, category, 'category')
            .pipe(first())
            .toPromise();
    }
}
