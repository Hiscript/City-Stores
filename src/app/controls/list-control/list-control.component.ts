import {
    Component,
    Input,
    ElementRef,
    OnInit,
    ViewChild,
    Output,
    EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { GridData } from '../../classes/grid-data';
import { SearchService } from '../../global/search.service';
import { DeviceService } from '../../global/device.service';
import { MatPaginator } from '@angular/material/paginator';
import { TermType } from '../../classes/term-type.enum';
import { GridType } from '../../classes/grid-type.enum';
import { Column } from '../../classes/column';
import { ColumnService } from '../../global/column.service';
import { SearchTerm } from '../../classes/search-term';
import { SelectionModel } from '../../../../node_modules/@angular/cdk/collections';

@Component({
    selector: 'list-control',
    templateUrl: './list-control.component.html'
})
export class ListControlComponent implements OnInit {
    @Input() data: Observable<GridData>;
    @Input() gridType: GridType;
    @Input() enableMultiselect = false;
    @Input() selectedIds: number[];

    @Output() selected: EventEmitter<number> = new EventEmitter<number>();
    @Output() multipleSelected: EventEmitter<number[]> = new EventEmitter<number[]>();
    selection: SelectionModel<number>;

    navClosed = true;
    filters: Column[];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        elementRef: ElementRef,
        private searchService: SearchService,
        public device: DeviceService,
        private columnService: ColumnService
    ) {
        const hammertime = new Hammer(elementRef.nativeElement, {
            touchAction: 'auto',
            inputClass: Hammer.TouchMouseInput
        });

        hammertime.on('swiperight', e => {
            this.navClosed = true;
        });
        hammertime.on('swipeleft', e => {
            this.navClosed = false;
        });
    }

    ngOnInit() {
        this.selection = new SelectionModel<number>(true, this.selectedIds);

        this.columnService.getFilterColumns(this.gridType).subscribe(c => {
            this.filters = c;
        });

        // Subscribe Paging
        this.paginator.page.subscribe(x => {
            this.searchService.add({
                tt: TermType.page,
                f: x.pageIndex.toString(),
                t: x.pageSize.toString()
            });
        });
    }

    applyFilter(terms: SearchTerm[]) {
        this.searchService.SearchTerms.next(terms);
        this.navClosed = true;
    }

    select(id: number): void {
        if (this.enableMultiselect) {
            this.selection.toggle(id);
            this.multipleSelected.emit(this.selection.selected);
        } else {
            this.selected.emit(id);
        }
    }
}
