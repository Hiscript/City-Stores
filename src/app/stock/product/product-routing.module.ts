import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './list/product-list.component';
import { ProductDetailComponent } from './detail/product-detail.component';
import { ProductResolve } from './resolvers/product.resolve';

export const ProductRoutes: Routes = [
    {
        path: '',
        component: ProductListComponent,
        data: { title: 'Product List' }
    },
    {
        path: ':id',
        component: ProductDetailComponent,
        resolve: { product: ProductResolve },
        data: { title: 'Product Detail' }
    }
];

export const ProductRoutingModule = RouterModule.forChild(ProductRoutes);
