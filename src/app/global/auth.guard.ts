import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private tokenService: TokenService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.tokenService.token) {
            if (!route.data.right) {
                return true;
            } else if (this.tokenService.hasRight(route.data.right)) {
                return true;
            } else {
                this.router.navigate(['/exception/forbiden']);
                return false;
            }
        }

        this.router.navigate(['auth/login']);
        return false;
    }
}
