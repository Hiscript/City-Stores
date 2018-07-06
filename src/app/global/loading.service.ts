import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    entity = new Subject<string>();

    start(entity: string) {
        this.entity.next(entity);
    }

    stop() {
        this.entity.next();
    }
}
