import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { ControlModule } from '../../controls/control.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { ProductListComponent } from './list/product-list.component';
import { ProductDetailComponent } from './detail/product-detail.component';
import { ProductService } from './services/product.service';
import { ProductResolve } from './resolvers/product.resolve';
import { ProductOverviewComponent } from './detail/overview/product-overview.component';
import { ProductSpecificationComponent } from './detail/specification/product-specification.component';
import { DocumentModule } from '../../document/document.module';
import { ProductAttributeService } from './services/product-attribute.service';
import { CategoryAttributeItemService } from '../category/services/category-attribute-item.service';
import { ProductStockService } from './services/product-stock.service';
import { ProductAdjustmentComponent } from './detail/overview/adjustment/product-adjustment.component';

@NgModule({
    imports: [ProductRoutingModule, ControlModule, SharedModule, MaterialModule, DocumentModule],
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ProductOverviewComponent,
        ProductSpecificationComponent,
        ProductAdjustmentComponent
    ],
    providers: [
        ProductService,
        ProductResolve,
        ProductAttributeService,
        CategoryAttributeItemService,
        ProductStockService
    ],
    entryComponents: [ProductAdjustmentComponent]
})
export class ProductModule {}
