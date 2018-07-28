import { Routes, RouterModule } from '@angular/router';
import { CatalogListComponent } from './list/catalog-list.component';
import { CatalogDetailComponent } from './detail/catalog-detail.component';
import { CatalogResolve } from './resolvers/catalog.resolver';

export const CatalogRoutes: Routes = [
    {
        path: '',
        component: CatalogListComponent,
        data: { title: 'Catalog List' }
    },
    {
        path: ':id',
        component: CatalogDetailComponent,
        resolve: { catalog: CatalogResolve },
        data: { title: 'Catalog Detail' }
    }
];

export const CatalogRoutingModule = RouterModule.forChild(CatalogRoutes);
