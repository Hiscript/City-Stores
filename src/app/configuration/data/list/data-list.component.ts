import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from '../../../global/device.service';

@Component({
    templateUrl: './data-list.component.html'
})
export class DataListComponent implements OnInit {
    typeName;
    showOutlet = false;

    constructor(private router: Router, private device: DeviceService) {}

    ngOnInit() {}

    routeActive(e: any) {
        this.showOutlet = true;
        if (this.device.handset) {
            e.route.params.subscribe(p => {
                this.typeName = p['name'];
            });
        }
    }

    routeDeactive(e: any) {
        this.showOutlet = false;
        this.typeName = null;
    }

    back() {
        this.router.navigate(['/app/config/data']);
    }
}
