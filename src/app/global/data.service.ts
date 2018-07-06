import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    baseUrl = environment.apiUrl;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private loadingService: LoadingService
    ) {}

    get<T>(url: string): Observable<T> {
        return this.httpClient
            .get<T>(this.baseUrl + url)
            .pipe(catchError(res => this.handleError(res)));
    }

    post<T>(url: string, body: any, entity: string = ''): Observable<T> {
        this.loadingService.start(entity);
        return this.httpClient.post<T>(this.baseUrl + url, body).pipe(
            catchError(res => this.handleError(res)),
            finalize(() => this.loadingService.stop())
        );
    }

    private handleError(response: Response | any) {
        switch (response.status) {
            case 400:
                // this.router.navigate(['/exception/internalerror']);
                break;
            case 401:
                this.router.navigate(['/auth/login']);
                break;
            case 403:
                this.router.navigate(['/exception/forbiden']);
                break;
            case 404:
                this.router.navigate(['/exception/notfound']);
                break;
            case 500:
                this.router.navigate(['/exception/internalerror']);
                break;
        }
        return observableThrowError(response);
    }
}
