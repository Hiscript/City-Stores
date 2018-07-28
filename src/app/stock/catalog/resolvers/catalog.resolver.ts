import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Catalog } from '../classes/catalog';
import { CatalogService } from '../services/catalog.service';

@Injectable()
export class CatalogResolve implements Resolve<Catalog> {
    constructor(private catalogService: CatalogService) {}

    resolve(route: ActivatedRouteSnapshot) {
        if (route.paramMap.get('id') === 'new') {
            return new Catalog();
        }

        return this.catalogService.detail(+route.paramMap.get('id'));
    }
}
