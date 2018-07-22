import { Routes, RouterModule } from '@angular/router';
import { AutoNumberListComponent } from './list/auto-number-list.component';

export const AutoNumberRoutes: Routes = [
    {
        path: '',
        component: AutoNumberListComponent,
        data: { title: 'Auto Number List' }
    }
];

export const AutoNumberRoutingModule = RouterModule.forChild(AutoNumberRoutes);
