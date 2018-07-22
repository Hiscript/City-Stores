import { Injectable } from '@angular/core';
import { DataService } from '../../../global/data.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from '../../../../../node_modules/rxjs';
import { LovType } from '../classes/lov-type';
import { LovItem } from '../classes/lov-item';
import { first, switchMap } from 'rxjs/operators';
import { DeleteConfirmComponent } from '../../../shared/components';
import { ChangeOrder } from '../../../classes/change-order';

@Injectable()
export class LovService {
    url = 'lov';
    constructor(private dataService: DataService, private dialog: MatDialog) {}

    getTypes(): Observable<LovType[]> {
        return this.dataService.get<LovType[]>(this.url, 'lovType');
    }

    getItems(typeId: number): Observable<LovItem[]> {
        return this.dataService.get<LovItem[]>(this.url + '/' + typeId.toString(), 'lovItem');
    }

    detail(typeId: number, itemId: number): Promise<LovItem> {
        return this.dataService
            .get<LovItem>(this.url + '/' + typeId.toString() + '/' + itemId.toString(), 'lovItem')
            .pipe(first())
            .toPromise();
    }

    insert(typeId: number, item: LovItem) {
        return this.dataService
            .post<LovItem>(this.url + '/' + typeId.toString(), item, 'lovItem')
            .pipe(first())
            .toPromise();
    }

    update(typeId: number, item: LovItem) {
        return this.dataService
            .put<LovItem>(this.url + '/' + typeId.toString(), item, 'lovItem')
            .pipe(first())
            .toPromise();
    }

    delete(typeId: number, itemId: number): Observable<boolean> {
        const dialogRef = this.dialog.open(DeleteConfirmComponent, {
            panelClass: 'confirmation-dialog',
            data: {
                title: 'Delete Confirmation',
                description: 'Continue deleting the item?',
                button: 'DELETE'
            }
        });

        return dialogRef.afterClosed().pipe(
            switchMap(confirm => {
                if (confirm) {
                    return this.dataService.delete<boolean>(
                        this.url + '/' + typeId.toString() + '/' + itemId.toString(),
                        'lovItem'
                    );
                } else {
                    return of(false);
                }
            })
        );
    }

    setDefault(typeId: number, itemId: number): Promise<boolean> {
        return this.dataService
            .post<boolean>(
                this.url + '/' + typeId.toString() + '/' + itemId.toString() + '/SetDefault',
                null,
                'setdefault'
            )
            .pipe(first())
            .toPromise();
    }

    changeOrder(typeId: number, change: ChangeOrder): Promise<boolean> {
        return this.dataService
            .post<boolean>(
                this.url + '/' + typeId.toString() + '/ChangeOrder',
                change,
                'changeOrder'
            )
            .pipe(first())
            .toPromise();
    }
}
