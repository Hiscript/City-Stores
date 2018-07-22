import { Routes, RouterModule } from '@angular/router';
import { DataListComponent } from './list/data-list.component';
import { DataItemComponent } from './list/item/data-item.component';

export const DataRoutes: Routes = [
    {
        path: '',
        component: DataListComponent,
        data: { title: 'Data' },
        children: [{ path: ':id/:name', component: DataItemComponent }]
    }
];

export const DataRoutingModule = RouterModule.forChild(DataRoutes);
