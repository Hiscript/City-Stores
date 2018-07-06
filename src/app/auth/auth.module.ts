import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthRoutingModule } from './auth-routing.module';
import { ControlModule } from '../controls/control.module';

import { LoginComponent } from './auth';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        AuthRoutingModule,
        MatCardModule,
        ControlModule,
        MatCheckboxModule,
        MaterialModule,
        SharedModule
    ],
    declarations: [LoginComponent]
})
export class AuthModule {}
