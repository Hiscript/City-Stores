import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    entities = new BehaviorSubject<string[]>([]);

    add(entity: string) {
        const existing = this.entities.getValue();
        existing.push(entity);
        this.entities.next(existing);
    }

    remove(entity: string) {
        const existing = this.entities.getValue();
        const index = existing.indexOf(entity);
        if (index > -1) {
            existing.splice(index, 1);
        }
        this.entities.next(existing);
    }

    has(entity: string): boolean {
        return this.entities.getValue().indexOf(entity) > -1;
    }
}
