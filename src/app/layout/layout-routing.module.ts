import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: '/app/home', pathMatch: 'full' },
            {
                path: 'home',
                component: HomeComponent,
                data: { title: 'Home' }
            }
        ]
    }
];

export const LayoutRoutingModule = RouterModule.forChild(routes);
