import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GridData } from '../../../classes/grid-data';
import { GridType } from '../../../classes/grid-type.enum';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { SearchService } from '../../../global/search.service';
import { DeviceService } from '../../../global/device.service';
import { debounceTime, takeUntil, switchMap, share } from 'rxjs/operators';

@Component({
    templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit, OnDestroy {
    categories: Observable<GridData>;
    gridType = GridType.Category;

    private unsubscribe$ = new Subject();

    constructor(
        private router: Router,
        private categoryService: CategoryService,
        private searchService: SearchService,
        public device: DeviceService
    ) {}

    ngOnInit() {
        this.categories = this.searchService.SearchTerms.pipe(
            debounceTime(500),
            takeUntil(this.unsubscribe$),
            switchMap(terms => this.categoryService.get(terms)),
            share()
        );
    }

    add() {
        this.router.navigate(['/app/stock/categories/new']);
    }

    select(categoryId: number): void {
        this.router.navigate(['/app/stock/categories', categoryId]);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.searchService.clear();
    }
}
