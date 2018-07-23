import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService } from '../../../global/data.service';
import { GridData } from '../../../classes/grid-data';
import { SearchTerm } from '../../../classes/search-term';
import { DeviceService } from '../../../global/device.service';
import { first, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../../../shared/components';
import { Product } from '../classes/product';

@Injectable()
export class ProductService {
    url = 'products';
    constructor(
        private dataService: DataService,
        private device: DeviceService,
        private dialog: MatDialog
    ) {}

    get(terms: SearchTerm[] = []): Observable<GridData> {
        if (this.device.handset) {
            return this.dataService.get<GridData>(
                this.url + '/m?terms=' + JSON.stringify(terms),
                'search'
            );
        } else {
            return this.dataService.get<GridData>(
                this.url + '?terms=' + JSON.stringify(terms),
                'search'
            );
        }
    }

    detail(productId: number): Promise<Product> {
        return this.dataService
            .get<Product>(this.url + '/' + productId.toString(), 'product')
            .pipe(first())
            .toPromise();
    }

    insert(product: Product) {
        return this.dataService
            .post<Product>(this.url, product, 'product')
            .pipe(first())
            .toPromise();
    }

    update(product: Product) {
        return this.dataService
            .put<Product>(this.url, product, 'product')
            .pipe(first())
            .toPromise();
    }

    changeImage(productId: number, imageURL: string): Observable<boolean> {
        if (!imageURL) {
            const dialogRef = this.dialog.open(DeleteConfirmComponent, {
                panelClass: 'confirmation-dialog',
                data: {
                    title: 'Delete Confirmation',
                    description: 'Continue deleting the image?',
                    button: 'DELETE'
                }
            });

            return dialogRef.afterClosed().pipe(
                switchMap(confirm => {
                    if (confirm) {
                        return this.dataService.put<any>(
                            this.url + '/' + productId.toString() + '/image',
                            '"' + imageURL + '"'
                        );
                    } else {
                        return of(false);
                    }
                })
            );
        } else {
            return this.dataService.put<any>(
                this.url + '/' + productId.toString() + '/image',
                '"' + imageURL + '"'
            );
        }
    }
}
