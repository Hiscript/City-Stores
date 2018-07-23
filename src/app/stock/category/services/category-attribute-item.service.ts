import { Injectable } from '@angular/core';
import { DataService } from '../../../global/data.service';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../../../shared/components';
import { CategoryAttributeItem } from '../classes/category-attribute-item';

@Injectable()
export class CategoryAttributeItemService {
    url = 'categories';
    constructor(private dataService: DataService, private dialog: MatDialog) {}

    get(categoryId: number, attributeId: number): Observable<CategoryAttributeItem[]> {
        return this.dataService.get<CategoryAttributeItem[]>(
            this.url +
                '/' +
                categoryId.toString() +
                '/attributes' +
                '/' +
                attributeId.toString() +
                '/Items',
            'categoryAttributeItem'
        );
    }

    insert(
        categoryId: number,
        attributeId: number,
        item: CategoryAttributeItem
    ): Promise<CategoryAttributeItem> {
        return this.dataService
            .post<CategoryAttributeItem>(
                this.url +
                    '/' +
                    categoryId.toString() +
                    '/attributes' +
                    '/' +
                    attributeId.toString() +
                    '/Items',
                item,
                'saveAttributeItem'
            )
            .pipe(first())
            .toPromise();
    }

    update(
        categoryId: number,
        attributeId: number,
        item: CategoryAttributeItem
    ): Promise<CategoryAttributeItem> {
        return this.dataService
            .put<CategoryAttributeItem>(
                this.url +
                    '/' +
                    categoryId.toString() +
                    '/attributes' +
                    '/' +
                    attributeId.toString() +
                    '/items',
                item,
                'saveAttributeItem'
            )
            .pipe(first())
            .toPromise();
    }

    delete(categoryId: number, attributeId: number, itemId: number): Observable<boolean> {
        const dialogRef = this.dialog.open(DeleteConfirmComponent, {
            panelClass: 'confirmation-dialog',
            data: {
                title: 'Delete Confirmation',
                description: 'Continue deleting the attribute item?',
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
                            attributeId.toString() +
                            '/items/' +
                            itemId.toString(),
                        'deleteAttribute'
                    );
                } else {
                    return of(false);
                }
            })
        );
    }
}
