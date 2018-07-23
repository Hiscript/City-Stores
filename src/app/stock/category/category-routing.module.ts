import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './list/category-list.component';
import { CategoryDetailComponent } from './detail/category-detail.component';
import { CategoryResolve } from './resolvers/category.resolver';

export const CategoryRoutes: Routes = [
    {
        path: '',
        component: CategoryListComponent,
        data: { title: 'Category List' }
    },
    {
        path: ':id',
        component: CategoryDetailComponent,
        resolve: { category: CategoryResolve },
        data: { title: 'Category Detail' }
    }
];

export const CategoryRoutingModule = RouterModule.forChild(CategoryRoutes);
