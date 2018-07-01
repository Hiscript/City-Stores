import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { LoginComponent } from "./auth";
import { AuthRoutingModule } from "./auth-routing.module";

import { ControlModule } from "../controls/control.module";

@NgModule({
  imports: [AuthRoutingModule, MatCardModule, ControlModule, MatCheckboxModule],
  declarations: [LoginComponent]
})
export class AuthModule {}
