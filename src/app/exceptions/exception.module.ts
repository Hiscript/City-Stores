import { NgModule } from '@angular/core';
import { ExceptionRoutingModule } from './exception-routing.module';
import { InternalExceptionComponent } from './500/500.component';
import { NotFoundExceptionComponent } from './404/404.component';
import { ForbidenExceptionComponent } from './403/403.component';

@NgModule({
    imports: [ExceptionRoutingModule],
    declarations: [
        InternalExceptionComponent,
        NotFoundExceptionComponent,
        ForbidenExceptionComponent
    ],
    providers: []
})
export class ExceptionModule {}
