import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GridData } from '../../../classes/grid-data';
import { GridType } from '../../../classes/grid-type.enum';
import { SearchService } from '../../../global/search.service';
import { debounceTime, switchMap, takeUntil, share } from 'rxjs/operators';
import { DeviceService } from '../../../global/device.service';
import { Router } from '@angular/router';
import { CatalogStatus } from '../classes/catalog-status.enum';
import { CatalogService } from '../services/catalog.service';
import { MatDialog } from '@angular/material/dialog';
import { CatalogEditComponent } from '../detail/edit/catalog-edit.component';
import { Catalog } from '../classes/catalog';

@Component({
    templateUrl: './catalog-list.component.html'
})
export class CatalogListComponent implements OnInit, OnDestroy {
    catalogs: Observable<GridData>;
    gridType = GridType.Catalog;
    statuses = CatalogStatus;

    private unsubscribe$ = new Subject();

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private catalogService: CatalogService,
        private searchService: SearchService,
        public device: DeviceService
    ) {}

    ngOnInit() {
        this.catalogs = this.searchService.SearchTerms.pipe(
            debounceTime(500),
            takeUntil(this.unsubscribe$),
            switchMap(terms => this.catalogService.get(terms)),
            share()
        );
    }

    add() {
        const dialogRef = this.dialog.open(CatalogEditComponent, {
            panelClass: ['full-sm-dialog', 'single'],
            data: new Catalog()
        });

        dialogRef.afterClosed().subscribe(catalog => {
            if (catalog) {
                this.router.navigate(['/app/stock/catalogs', catalog.catalogId]);
            }
        });
    }

    select(catalogId: number): void {
        this.router.navigate(['/app/stock/catalogs', catalogId]);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.searchService.clear();
    }
}
