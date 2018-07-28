import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    baseUrl = environment.apiUrl;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private loadingService: LoadingService,
        public snackBar: MatSnackBar
    ) {}

    get<T>(url: string, entity: string = ''): Observable<T> {
        this.loadingService.add(entity);
        return this.httpClient.get<T>(this.baseUrl + url).pipe(
            catchError(res => this.handleError(res)),
            finalize(() => this.loadingService.remove(entity))
        );
    }

    post<T>(url: string, body: any, entity: string = ''): Observable<T> {
        this.loadingService.add(entity);
        return this.httpClient.post<T>(this.baseUrl + url, body).pipe(
            catchError(res => this.handleError(res)),
            finalize(() => this.loadingService.remove(entity))
        );
    }

    put<T>(url: string, body: any, entity: string = ''): Observable<T> {
        this.loadingService.add(entity);
        return this.httpClient.put<T>(this.baseUrl + url, body, this.httpOptions).pipe(
            catchError(res => this.handleError(res)),
            finalize(() => this.loadingService.remove(entity))
        );
    }

    patch(url: string, property: any, value: any, entity: string = ''): Observable<boolean> {
        this.loadingService.add(entity);
        return this.httpClient
            .patch<boolean>(this.baseUrl + url + '/' + property + '/' + value, null)
            .pipe(
                catchError(res => this.handleError(res)),
                finalize(() => this.loadingService.remove(entity))
            );
    }

    delete<T>(url: string, entity: string = ''): Observable<T> {
        this.loadingService.add(entity);
        return this.httpClient.delete<T>(this.baseUrl + url).pipe(
            catchError(res => this.handleError(res)),
            finalize(() => this.loadingService.remove(entity))
        );
    }

    private handleError(response: Response | any) {
        switch (response.status) {
            case 400:
                this.snackBar.open(response.error, '', {
                    duration: 3000,
                    panelClass: ['error-snack']
                });
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
