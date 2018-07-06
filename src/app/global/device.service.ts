import { Injectable, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    handset: boolean;
    tablet: boolean;
    desktop: boolean;

    constructor(breakpointObserver: BreakpointObserver) {
        this.handset = breakpointObserver.isMatched(Breakpoints.Handset);
        this.tablet = breakpointObserver.isMatched(Breakpoints.Tablet);
        this.desktop = breakpointObserver.isMatched(Breakpoints.Web);
    }
}
