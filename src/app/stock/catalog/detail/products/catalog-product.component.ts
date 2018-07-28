import { OnInit, Component, Input } from '@angular/core';
import { CatalogProductService } from '../../services/catalog-product.service';
import { Observable } from 'rxjs';
import { CatalogProduct } from '../../classes/catalog-product';
import { DocumentService } from '../../../../global/document.service';

@Component({
    selector: 'catalog-product',
    templateUrl: './catalog-product.component.html'
})
export class CatalogProductComponent implements OnInit {
    @Input() catalogId: number;
    @Input() products: CatalogProduct[];

    constructor(
        private catalogProductService: CatalogProductService,
        public document: DocumentService
    ) {}

    ngOnInit() {}

    delete(catalogProductId: number, i: number) {
        this.catalogProductService.delete(this.catalogId, catalogProductId).then(deleted => {
            if (this.delete) {
                this.products.splice(i, 1);
            }
        });
    }
}
