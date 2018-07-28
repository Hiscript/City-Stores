import { Catalog } from '../classes/catalog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CatalogEditComponent } from './edit/catalog-edit.component';
import { ProductSelectComponent } from './products/product-select.component';
import { CatalogProductService } from '../services/catalog-product.service';
import { CatalogProduct } from '../classes/catalog-product';

@Component({
    templateUrl: './catalog-detail.component.html'
})
export class CatalogDetailComponent implements OnInit {
    catalog: Catalog;
    products: CatalogProduct[] = [];

    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private catalogProductService: CatalogProductService
    ) {}

    ngOnInit(): void {
        this.catalog = this.route.snapshot.data['catalog'];
        this.refreshProducts();
    }

    refreshProducts() {
        if (this.catalog.catalogId > 0) {
            this.catalogProductService
                .get(this.catalog.catalogId)
                .subscribe(products => (this.products = products));
        }
    }

    back(): void {
        this.router.navigate(['/app/stock/catalogs']);
    }

    edit(): void {
        const dialogRef = this.dialog.open(CatalogEditComponent, {
            panelClass: ['full-sm-dialog', 'single'],
            data: this.catalog
        });

        dialogRef.afterClosed().subscribe(catalog => {
            if (catalog) {
                this.catalog = catalog;
            }
        });
    }

    add(): void {
        const dialogRef = this.dialog.open(ProductSelectComponent, {
            panelClass: ['full-sm-dialog', 'grid'],
            data: this.products.map(product => product.productId)
        });

        dialogRef.afterClosed().subscribe(selected => {
            if (selected) {
                this.catalogProductService
                    .update(this.catalog.catalogId, selected)
                    .then(updated => {
                        if (updated) {
                            this.refreshProducts();
                        }
                    });
            }
        });
    }
}
