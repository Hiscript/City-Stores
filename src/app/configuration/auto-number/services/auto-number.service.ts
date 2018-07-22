import { Injectable } from '@angular/core';
import { DataService } from '../../../global/data.service';
import { AutoNumber } from '../classes/auto-number';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class AutoNumberService {
    url = 'autonumbers';
    constructor(private dataService: DataService) {}

    get(): Observable<AutoNumber[]> {
        return this.dataService.get<AutoNumber[]>(this.url, 'autonumber');
    }

    update(autoNumber: AutoNumber) {
        return this.dataService
            .put<AutoNumber>(this.url, autoNumber, 'autonumber')
            .pipe(first())
            .toPromise();
    }
}
