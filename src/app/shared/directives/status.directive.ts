import { Directive, ElementRef, Input, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[status]'
})
export class StatusDirective implements AfterViewInit {
    @Input('status') status: number;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        this.setStatus();
    }

    setStatus(): void {
        this.renderer.addClass(this.el.nativeElement, 'status-pill');
        switch (this.status) {
            case 1:
                this.renderer.addClass(this.el.nativeElement, 'parked');
                break;
            case 2:
                this.renderer.addClass(this.el.nativeElement, 'parked');
                break;
            case 3:
                this.renderer.addClass(this.el.nativeElement, 'parked');
                break;
            case 4:
                this.renderer.addClass(this.el.nativeElement, 'parked');
                break;
            case 5:
                this.renderer.addClass(this.el.nativeElement, 'progress');
                break;
            case 6:
                this.renderer.addClass(this.el.nativeElement, 'progress');
                break;
            case 7:
                this.renderer.addClass(this.el.nativeElement, 'progress');
                break;
            case 10:
                this.renderer.addClass(this.el.nativeElement, 'success');
                break;
            case 11:
                this.renderer.addClass(this.el.nativeElement, 'danger');
                break;
            case 12:
                this.renderer.addClass(this.el.nativeElement, 'danger');
                break;
            case 101:
                this.renderer.addClass(this.el.nativeElement, 'success');
                break;
            case 102:
                this.renderer.addClass(this.el.nativeElement, 'danger');
                break;
            case 201:
                this.renderer.addClass(this.el.nativeElement, 'success');
                break;
            case 202:
                this.renderer.addClass(this.el.nativeElement, 'danger');
                break;
            case 203:
                this.renderer.addClass(this.el.nativeElement, 'progress');
                break;
            case 401:
                this.renderer.addClass(this.el.nativeElement, 'success');
                break;
            case 404:
                this.renderer.addClass(this.el.nativeElement, 'danger');
                break;
        }
    }
}
