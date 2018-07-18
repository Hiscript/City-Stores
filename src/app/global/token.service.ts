import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Right } from './rights.enum';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    get token(): string {
        if (sessionStorage.getItem('token') != null) {
            return sessionStorage.getItem('token');
        } else {
            return localStorage.getItem('token');
        }
    }

    get tenantId(): string {
        return this.getDecodedToken().t;
    }

    get userId(): string {
        return this.getDecodedToken().u;
    }

    setToken(token: string, remember: boolean) {
        if (remember) {
            localStorage.setItem('token', token);
        } else {
            sessionStorage.setItem('token', token);
        }
    }

    logout() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
    }

    getDecodedToken(): any {
        try {
            return jwt_decode(this.token);
        } catch (Error) {
            return null;
        }
    }

    getUserRights(): string[] {
        return this.getDecodedToken().r.split(',');
    }

    hasRight(right: Right) {
        return this.getUserRights().indexOf(right.toString()) > -1;
    }
}
