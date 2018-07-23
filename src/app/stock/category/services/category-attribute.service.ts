import { Injectable } from '@angular/core';
import { DataService } from '../../../global/data.service';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../../../shared/components';
import { CategoryAttribute } from '../classes/category-attribute';
import { ChangeOrder } from '../../../classes/change-order';

@Injectable()
export class CategoryAttributeService {
    url = 'categories';
    constructor(private dataService: DataService, private dialog: MatDialog) {}

    get(categoryId: number): Observable<CategoryAttribute[]> {
        return this.dataService.get<CategoryAttribute[]>(
            this.url + '/' + categoryId.toString() + '/attributes',
            'categoryAttribute'
        );
    }

    detail(categoryId: number, attributeId: number): Promise<CategoryAttribute> {
        return this.dataService
            .get<CategoryAttribute>(
                this.url +
                    '/' +
                    categoryId.toString() +
                    '/attributes' +
                    '/' +
                    attributeId.toString(),
                'categoryAttribute'
            )
            .pipe(first())
            .toPromise();
    }

    insert(categoryId: number, attribute: CategoryAttribute): Promise<CategoryAttribute> {
        return this.dataService
            .post<CategoryAttribute>(
                this.url + '/' + categoryId.toString() + '/attributes',
                attribute,
                'saveAttribute'
            )
            .pipe(first())
            .toPromise();
    }

    update(categoryId: number, attribute: CategoryAttribute): Promise<CategoryAttribute> {
        return this.dataService
            .put<CategoryAttribute>(
                this.url + '/' + categoryId.toString() + '/attributes',
                attribute,
                'saveAttribute'
            )
            .pipe(first())
            .toPromise();
    }

    delete(categoryId: number, attributeId: number): Observable<boolean> {
        const dialogRef = this.dialog.open(DeleteConfirmComponent, {
            panelClass: 'confirmation-dialog',
            data: {
                title: 'Delete Confirmation',
                description: 'Continue deleting the attribute?',
                button: 'DELETE'
            }
        });

        return dialogRef.afterClosed().pipe(
            switchMap(confirm => {
                if (confirm) {
                    return this.dataService.delete<boolean>(
                        this.url +
                            '/' +
                            categoryId.toString() +
                            '/attributes/' +
                            attributeId.toString(),
                        'deleteAttribute'
                    );
                } else {
                    return of(false);
                }
            })
        );
    }

    changeOrder(categoryId: number, change: ChangeOrder): Promise<boolean> {
        return this.dataService
            .post<boolean>(
                this.url + '/' + categoryId.toString() + '/attributes/ChangeOrder',
                change,
                'changeOrder'
            )
            .pipe(first())
            .toPromise();
    }
}
