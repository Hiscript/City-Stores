import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Column } from '../../classes/column';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchTerm } from '../../classes/search-term';
import { ControlType } from '../../classes/control-type.enum';
import { TermType } from '../../classes/term-type.enum';

@Component({
    selector: 'filter-control',
    templateUrl: './filter-control.component.html'
})
export class FilterControlComponent implements OnInit {
    @Input() filters: Column[];

    @Output() apply: EventEmitter<SearchTerm[]> = new EventEmitter<SearchTerm[]>();

    filterForm: FormGroup;
    terms: SearchTerm[];

    ngOnInit() {
        if (this.filters) {
            this.createFilterForm();
        }
    }

    private createFilterForm(): void {
        const group: any = {};
        this.filters.forEach(element => {
            if (element.controlTypeId !== ControlType.datePicker) {
                group[element.columnName] = new FormControl(null);
            } else {
                group[element.columnName + 'From'] = new FormControl(null);
                group[element.columnName + 'To'] = new FormControl(null);
            }
        });
        this.filterForm = new FormGroup(group);
    }

    private updateModel(): void {
        this.terms = [];
        this.filters.forEach(element => {
            if (element.controlTypeId !== ControlType.datePicker) {
                if (this.filterForm.controls[element.columnName].value) {
                    const term: SearchTerm = new SearchTerm();
                    // Field
                    term.f = element.columnName;

                    // Term
                    switch (element.controlTypeId) {
                        case ControlType.dropdown:
                        case ControlType.autoComplete:
                        case ControlType.category:
                            term.t = this.filterForm.controls[element.columnName].value.name;
                            break;
                        default:
                            term.t = this.filterForm.controls[element.columnName].value;
                    }

                    // Type
                    if (element.controlTypeId === ControlType.textbox) {
                        term.tt = TermType.contains;
                    } else {
                        term.tt = TermType.equals;
                    }

                    // Push
                    this.terms.push(term);
                }
            } else {
                if (this.filterForm.controls[element.columnName + 'From'].value) {
                    const term: SearchTerm = new SearchTerm();
                    term.f = element.columnName;
                    term.t = this.filterForm.controls[element.columnName + 'From'].value
                        .toISOString()
                        .substring(0, 10);
                    term.tt = TermType.fromDate;
                    this.terms.push(term);
                }
                if (this.filterForm.controls[element.columnName + 'To'].value) {
                    const term: SearchTerm = new SearchTerm();
                    term.f = element.columnName;
                    term.t = this.filterForm.controls[element.columnName + 'To'].value
                        .toISOString()
                        .substring(0, 10);
                    term.tt = TermType.toDate;
                    this.terms.push(term);
                }
            }
        });
    }

    submit(): void {
        if (this.filterForm.valid) {
            this.updateModel();
            this.apply.emit(this.terms);
        }
    }
}
