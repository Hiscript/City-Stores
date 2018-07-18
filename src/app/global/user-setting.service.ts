import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserSettingService {
    /*
    * Aspect Ratio
    * Default : 1
    */
    get defaultAspectRatio(): number {
        if (localStorage.getItem('aspect-ratio') == null) {
            return 1;
        }
        return +localStorage.getItem('aspect-ratio');
    }
    set defaultAspectRatio(value: number) {
        localStorage.setItem('aspect-ratio', value.toString());
    }
}
