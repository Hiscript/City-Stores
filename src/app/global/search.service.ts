import { Injectable } from '@angular/core';
import { SearchTerm } from '../classes/search-term';
import { BehaviorSubject } from 'rxjs';
import { TermType } from '../classes/term-type.enum';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    loading = true;
    SearchTerms = new BehaviorSubject<SearchTerm[]>([]);

    add(term: SearchTerm) {
        this.loading = true;

        // Remove existing same term
        if (
            this.SearchTerms.getValue().filter(x => x.tt === term.tt && x.f === term.f).length > 0
        ) {
            const i = this.SearchTerms.getValue().indexOf(
                this.SearchTerms.getValue().filter(x => x.tt === term.tt && x.f === term.f)[0],
                0
            );
            this.SearchTerms.getValue().splice(i, 1);
        }

        // Set page index to 0 for filter terms by removing paging term
        if (term.tt !== TermType.sort && term.tt !== TermType.page) {
            if (this.SearchTerms.getValue().filter(x => x.tt === TermType.page).length > 0) {
                const p = this.SearchTerms.getValue().indexOf(
                    this.SearchTerms.getValue().filter(x => x.tt === TermType.page)[0],
                    0
                );
                this.SearchTerms.getValue().splice(p, 1);
            }
        }

        // Add term
        if (term.t !== '' && term.t !== null) {
            const newTerm: SearchTerm[] = this.SearchTerms.getValue();
            newTerm.push(term);
            this.SearchTerms.next(newTerm);
        } else {
            this.SearchTerms.next(this.SearchTerms.getValue());
        }
    }

    remove(field: string, type: TermType = null) {
        this.loading = true;

        if (type == null) {
            if (this.SearchTerms.getValue().filter(x => x.f === field).length > 0) {
                const i = this.SearchTerms.getValue().indexOf(
                    this.SearchTerms.getValue().filter(x => x.f === field)[0],
                    0
                );
                this.SearchTerms.getValue().splice(i, 1);
            }
        } else {
            if (
                this.SearchTerms.getValue().filter(x => x.f === field && x.tt === type).length > 0
            ) {
                const i = this.SearchTerms.getValue().indexOf(
                    this.SearchTerms.getValue().filter(x => x.f === field && x.tt === type)[0],
                    0
                );
                this.SearchTerms.getValue().splice(i, 1);
            }
        }

        this.SearchTerms.next(this.SearchTerms.getValue());
    }

    public clear() {
        this.loading = true;
        this.SearchTerms.next([]);
    }
}
