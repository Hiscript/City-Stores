import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as Hammer from 'hammerjs';
import { MatSidenav } from '@angular/material/sidenav';
import { DeviceService } from '../global/device.service';
import { routeAnimation } from '../shared/animations/route.animation';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    templateUrl: './layout.component.html',
    animations: [routeAnimation]
})
export class LayoutComponent implements OnInit {
    navCollapsed = false;
    navClosed = false;

    fixedHeader = false;

    @ViewChild(MatSidenav) public sidenav: MatSidenav;

    constructor(private elementRef: ElementRef, public device: DeviceService, router: Router) {
        const hammertime = new Hammer(elementRef.nativeElement, {
            touchAction: 'auto',
            inputClass: Hammer.TouchMouseInput
        });

        hammertime.on('swiperight', e => {
            const point = e.changedPointers[0].screenX - e.deltaX;
            if (device.handset && point < 15) {
                this.navClosed = false;
            }
        });
        hammertime.on('swipeleft', e => {
            const point = e.changedPointers[0].screenX - e.deltaX;
            if (device.handset && point < 265 && point > 250) {
                this.navClosed = true;
            }
        });

        if (device.handset) {
            router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.navClosed = true;
                }
            });
        }
    }

    ngOnInit() {
        if (this.device.handset) {
            this.navClosed = true;
        }
    }

    toggleCollapsedNav() {
        if (this.device.handset) {
            this.navClosed = !this.navClosed;
        } else {
            this.navCollapsed = !this.navCollapsed;
        }
    }

    getState(outlet) {
        return outlet.activatedRouteData.title;
    }

    @HostListener('window:scroll', [])
    onWindowScroll(e) {
        const element = document.getElementsByClassName('app-content');
        if (element.length > 0) {
            const number = e.target.scrollTop;
            if (number > 56) {
                element.item(0).classList.add('sticky');
            } else if (element.item(0).classList.contains('sticky') && number < 56) {
                element.item(0).classList.remove('sticky');
            }
        }
    }
}
