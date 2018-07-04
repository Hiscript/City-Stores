import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../classes/loginModel';
import { TenantToken } from '../classes/tenantToken';
import { DataService } from '../../global/data.service';

@Injectable()
export class AuthService {
    url = 'auth';
    constructor(private dataService: DataService) {}

    login(login: LoginModel): Observable<TenantToken[]> {
        return this.dataService.post<TenantToken[]>(this.url + '/login', login);
    }
}
