import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { GridData } from '../../classes/grid-data';
import { GridType } from '../../classes/grid-type.enum';
import { ColumnService } from '../../global/column.service';
import { Column } from '../../classes/column';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../global/search.service';
import { TermType } from '../../classes/term-type.enum';
import * as Hammer from 'hammerjs';
import { DeviceService } from '../../global/device.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SearchTerm } from '../../classes/search-term';

@Component({
    selector: 'grid-control',
    templateUrl: './grid-control.component.html'
})
export class GridControlComponent implements OnInit {
    @Input() data: Observable<GridData>;
    @Input() gridType: GridType;
    @Input() searchColumns: string;
    @Input() statuses: any[];

    navClosed = true;

    gridColumns: any = [];
    displayColumns: string[] = [];
    filters: Column[];

    searchCtrl: FormControl;
    statusCtrl: FormControl;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        elementRef: ElementRef,
        private columnService: ColumnService,
        private searchService: SearchService,
        public device: DeviceService
    ) {
        this.subscribeFilter();

        const hammertime = new Hammer(elementRef.nativeElement, {
            touchAction: 'auto',
            inputClass: Hammer.TouchMouseInput
        });

        hammertime.on('swiperight', e => {
            this.navClosed = true;
            e.preventDefault();
        });
        hammertime.on('swipeleft', e => {
            this.navClosed = false;
            e.preventDefault();
        });
    }

    ngOnInit() {
        this.columnService.get(this.gridType).subscribe(c => {
            this.convertToGridColumn(c);
            this.filters = c.filter(f => f.isFilter);
        });

        // Subscribe Paging
        this.paginator.page.subscribe(x => {
            this.searchService.add({
                tt: TermType.page,
                f: x.pageIndex.toString(),
                t: x.pageSize.toString()
            });
        });

        // Subscribe Sorting
        this.sort.sortChange.subscribe(x => {
            this.searchService.add({
                tt: TermType.sort,
                f: x.active,
                t: x.direction
            });
        });
    }

    convertToGridColumn(columns: Column[]) {
        columns.forEach(c => {
            this.gridColumns.push({
                columnDef: c.columnName,
                header: c.displayName,
                cell: (element: any) => `${c.dataTypeId}`
            });
            if (!c.isOptional && c.displayOrder > 0) {
                this.displayColumns.push(c.columnName);
            }
        });
    }

    subscribeFilter(): void {
        // Search
        this.searchCtrl = new FormControl();
        this.searchCtrl.valueChanges.subscribe(search => {
            this.searchService.add({
                tt: TermType.contains,
                f: this.searchColumns,
                t: search
            });
        });

        // Status
        this.statusCtrl = new FormControl();
        this.statusCtrl.valueChanges.subscribe(x => {
            this.searchService.add({
                tt: TermType.equals,
                f: 'Status',
                t: x ? x.id : ''
            });
        });
    }

    applyFilter(terms: SearchTerm[]) {
        this.searchService.SearchTerms.next(terms);
    }
}
