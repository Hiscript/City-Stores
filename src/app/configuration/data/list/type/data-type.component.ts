import { Component, OnInit } from '@angular/core';
import { LovType } from '../../classes/lov-type';
import { ActivatedRoute, Router } from '@angular/router';
import { LovService } from '../../services/lov.service';

@Component({
    selector: 'data-type',
    templateUrl: './data-type.component.html'
})
export class DataTypeComponent implements OnInit {
    groups: string[];
    types: LovType[];
    selectedTypeId: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private lovService: LovService
    ) {}

    ngOnInit() {
        if (this.route.firstChild) {
            this.selectedTypeId = this.route.firstChild.snapshot.params['id'];
        } else {
            this.selectedTypeId = null;
        }

        this.lovService.getTypes().subscribe(types => {
            this.types = types;
            this.setGroup();
        });
    }

    setGroup(): void {
        this.groups = this.types
            .map(a => a.lovGroupName)
            .filter((x, i, a) => x && a.indexOf(x) === i);
    }

    select(type: LovType): void {
        this.selectedTypeId = type.lovTypeId;
        this.router.navigate(['/app/config/data', type.lovTypeId, type.lovTypeName]);
    }
}
