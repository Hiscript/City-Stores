import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthRoutingModule } from './auth-routing.module';
import { ControlModule } from '../controls/control.module';

import { LoginComponent } from './auth';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
    imports: [AuthRoutingModule, MatCardModule, ControlModule, MatCheckboxModule, MaterialModule],
    declarations: [LoginComponent]
})
export class AuthModule {}
