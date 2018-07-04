import { RouterModule, Routes } from '@angular/router';
import { InternalExceptionComponent } from './500/500.component';
import { NotFoundExceptionComponent } from './404/404.component';
import { ForbidenExceptionComponent } from './403/403.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: '/exception/internalerror', pathMatch: 'full' },
            {
                path: 'internalerror',
                component: InternalExceptionComponent
            },
            {
                path: 'notfound',
                component: NotFoundExceptionComponent
            },
            {
                path: 'forbiden',
                component: ForbidenExceptionComponent
            }
        ]
    }
];

export const ExceptionRoutingModule = RouterModule.forChild(routes);
