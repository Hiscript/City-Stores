import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Category } from '../classes/category';
import { CategoryService } from '../services/category.service';

@Injectable()
export class CategoryResolve implements Resolve<Category> {
    constructor(private categoryService: CategoryService) {}

    resolve(route: ActivatedRouteSnapshot) {
        if (route.paramMap.get('id') === 'new') {
            return new Category();
        }

        return this.categoryService.detail(+route.paramMap.get('id'));
    }
}
