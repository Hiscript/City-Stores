import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../global/auth.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: '/app/config/autonumbers', pathMatch: 'full' },
            {
                path: 'autonumbers',
                loadChildren: './auto-number/auto-number.module#AutoNumberModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'data',
                loadChildren: './data/data.module#DataModule',
                canActivate: [AuthGuard]
            }
        ]
    }
];

export const ConfigurationRoutingModule = RouterModule.forChild(routes);
