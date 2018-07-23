import { Injectable } from '@angular/core';
import { DataService } from '../../../global/data.service';
import { Observable } from 'rxjs';
import { ProductAttribute } from '../classes/product-attribute';
import { first } from 'rxjs/operators';

@Injectable()
export class ProductAttributeService {
    url = 'products';
    constructor(private dataService: DataService) {}

    get(productId: number): Observable<ProductAttribute[]> {
        return this.dataService.get<ProductAttribute[]>(
            this.url + '/' + productId.toString() + '/attributes',
            'productAttribute'
        );
    }

    insert(productId: number, attributes: ProductAttribute[]): Promise<ProductAttribute[]> {
        return this.dataService
            .post<ProductAttribute[]>(
                this.url + '/' + productId.toString() + '/attributes',
                attributes,
                'saveAttribute'
            )
            .pipe(first())
            .toPromise();
    }
}
