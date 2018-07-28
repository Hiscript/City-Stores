import { Injectable } from '@angular/core';
import { DataService } from '../../../global/data.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CatalogProduct } from '../classes/catalog-product';

@Injectable()
export class CatalogProductService {
    url = 'catalogs';
    constructor(private dataService: DataService) {}

    get(catalogId: number): Observable<CatalogProduct[]> {
        return this.dataService.get<CatalogProduct[]>(
            this.url + '/' + catalogId.toString() + '/products',
            'catalogProduct'
        );
    }

    update(catalogId: number, productIds: number[]) {
        return this.dataService
            .post<boolean>(
                this.url + '/' + catalogId.toString() + '/products',
                productIds,
                'catalogProduct'
            )
            .pipe(first())
            .toPromise();
    }

    delete(catalogId: number, catalogProductId: number): Promise<boolean> {
        return this.dataService
            .delete<boolean>(
                this.url + '/' + catalogId.toString() + '/products/' + catalogProductId.toString(),
                'removeProduct'
            )
            .toPromise();
    }
}
