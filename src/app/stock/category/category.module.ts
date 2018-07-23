import { NgModule } from '@angular/core';
import { CategoryRoutingModule } from './category-routing.module';
import { ControlModule } from '../../controls/control.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { CategoryService } from './services/category.service';
import { CategoryResolve } from './resolvers/category.resolver';
import { CategoryListComponent } from './list/category-list.component';
import { CategoryDetailComponent } from './detail/category-detail.component';
import { CategoryOverviewComponent } from './detail/overview/category-overview.component';
import { CategoryAttributeComponent } from './detail/attribute/category-attribute.component';
import { DragNDropModule } from '../../material/dragNdrop.Module';
import { CategoryAttributeService } from './services/category-attribute.service';
import { AttributeDetailComponent } from './detail/attribute/attribute-detail.component';
import { CategoryAttributeItemService } from './services/category-attribute-item.service';

@NgModule({
    imports: [CategoryRoutingModule, ControlModule, SharedModule, MaterialModule, DragNDropModule],
    declarations: [
        CategoryListComponent,
        CategoryDetailComponent,
        CategoryOverviewComponent,
        CategoryAttributeComponent,
        AttributeDetailComponent
    ],
    providers: [
        CategoryService,
        CategoryResolve,
        CategoryAttributeService,
        CategoryAttributeItemService
    ],
    entryComponents: [AttributeDetailComponent]
})
export class CategoryModule {}
