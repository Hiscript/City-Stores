import { Injectable } from '@angular/core';
import { DataService } from '../../../global/data.service';
import { ProductAdjustment } from '../classes/product-adjustment';
import { first } from 'rxjs/operators';
import { ProductStock } from '../classes/product-stock';

@Injectable()
export class ProductStockService {
    constructor(private dataService: DataService) {}

    getStock(productId): Promise<ProductStock> {
        return this.dataService
            .get<ProductStock>('stock/' + productId.toString(), 'productStock')
            .pipe(first())
            .toPromise();
    }

    productAdjustment(productId: number, adjustment: ProductAdjustment) {
        return this.dataService
            .post('adjustments/' + productId.toString(), adjustment, 'productAdjustment')
            .pipe(first())
            .toPromise();
    }
}
