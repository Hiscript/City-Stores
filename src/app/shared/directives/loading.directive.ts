import { Directive, Input, ElementRef, OnDestroy, OnInit, Renderer } from '@angular/core';
import { LoadingService } from '../../global/loading.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
    selector: '[loading-entity]'
})
export class LoadingDirective implements OnDestroy, OnInit {
    // tslint:disable-next-line:no-input-rename
    @Input('loading-entity') entity: string;
    private unsubscribe$ = new Subject();

    constructor(
        private loadingService: LoadingService,
        private el: ElementRef,
        private renderer: Renderer
    ) {}

    ngOnInit(): void {
        this.loadingService.entity.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            if (this.entity === x) {
                this.renderer.setElementAttribute(this.el.nativeElement, 'disabled', 'true');
            } else {
                this.renderer.setElementAttribute(this.el.nativeElement, 'disabled', null);
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
