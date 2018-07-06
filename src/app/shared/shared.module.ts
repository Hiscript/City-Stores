import { NgModule } from '@angular/core';
import { LoadingDirective } from './directives/loading.directive';

@NgModule({
    declarations: [LoadingDirective],
    exports: [LoadingDirective],
    providers: []
})
export class SharedModule {}
