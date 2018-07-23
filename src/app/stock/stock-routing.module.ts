import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../global/auth.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: '/app/stock/categories', pathMatch: 'full' },
            {
                path: 'categories',
                loadChildren: './category/category.module#CategoryModule',
                canActivate: [AuthGuard]
            }
        ]
    }
];

export const StockRoutingModule = RouterModule.forChild(routes);
