import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import * as Hammer from 'hammerjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
    navCollapsed = false;
    navClosed = false;

    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    @ViewChild(MatSidenav) public sidenav: MatSidenav;

    ngOnInit() {}

    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 800px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

        const hammertime = new Hammer(elementRef.nativeElement, {});
        hammertime.on('panright', ev => {
            if (this.mobileQuery.matches) this.navClosed = false;
        });
        hammertime.on('panleft', ev => {
            if (this.mobileQuery.matches) this.navClosed = true;
        });
    }

    toggleCollapsedNav() {
        if (this.mobileQuery.matches) this.navClosed = !this.navClosed;
        else this.navCollapsed = !this.navCollapsed;
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
