import { NgModule } from '@angular/core';
import { CatalogRoutingModule } from './catalog-routing.module';
import { ControlModule } from '../../controls/control.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { DocumentModule } from '../../document/document.module';
import { CatalogListComponent } from './list/catalog-list.component';
import { CatalogDetailComponent } from './detail/catalog-detail.component';
import { CatalogService } from './services/catalog.service';
import { CatalogResolve } from './resolvers/catalog.resolver';
import { CatalogEditComponent } from './detail/edit/catalog-edit.component';
import { ProductSelectComponent } from './detail/products/product-select.component';
import { ProductService } from '../product/services/product.service';
import { CatalogProductService } from './services/catalog-product.service';
import { CatalogProductComponent } from './detail/products/catalog-product.component';

@NgModule({
    imports: [CatalogRoutingModule, ControlModule, SharedModule, MaterialModule, DocumentModule],
    declarations: [
        CatalogListComponent,
        CatalogDetailComponent,
        CatalogEditComponent,
        CatalogProductComponent,
        ProductSelectComponent
    ],
    providers: [CatalogService, CatalogResolve, ProductService, CatalogProductService],
    entryComponents: [CatalogEditComponent, ProductSelectComponent]
})
export class CatalogModule {}
