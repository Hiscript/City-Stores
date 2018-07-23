import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';

@Injectable()
export class ProductResolve implements Resolve<Product> {
    constructor(private productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot) {
        if (route.paramMap.get('id') === 'new') {
            return new Product();
        }

        return this.productService.detail(+route.paramMap.get('id'));
    }
}
