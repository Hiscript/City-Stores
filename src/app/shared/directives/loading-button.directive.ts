import { Directive, Input, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { LoadingService } from '../../global/loading.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
    selector: '[loading-button]'
})
export class LoadingButtonDirective implements OnDestroy, OnInit {
    // tslint:disable-next-line:no-input-rename
    @Input('loading-button') entity: string;
    private unsubscribe$ = new Subject();

    constructor(
        private loadingService: LoadingService,
        private el: ElementRef,
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        this.loadingService.entities.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            if (x.indexOf(this.entity) > -1) {
                this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
            } else {
                this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
