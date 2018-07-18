import { Directive, Input, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { LoadingService } from '../../global/loading.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
    selector: '[loading-bar]'
})
export class LoadingBarDirective implements OnDestroy, OnInit {
    // tslint:disable-next-line:no-input-rename
    @Input('loading-bar') entity: string;
    private unsubscribe$ = new Subject();

    constructor(
        private loadingService: LoadingService,
        private el: ElementRef,
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        this.loadingService.entities.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            if (x.indexOf(this.entity) > -1) {
                this.renderer.setStyle(this.el.nativeElement, 'visibility', 'visible');
            } else {
                this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
