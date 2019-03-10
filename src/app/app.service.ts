import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from './../environments/environment';

@Injectable()
export class AppService {
    user;
    constructor(
        private http: HttpClient,
        private router: Router) {
    }

    getProduct() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('x-token', token);
        return this.http.get(environment.api + '/products', { headers: headers })
            .map((res: any) => {
                return res;
            });
    }

    login(params): Observable<any> {
        return this.http.post(environment.api + '/user/login', params)
            .map((res: any) => {
                const token = res.token;
                this.user = res.user;
                localStorage.setItem('token', token);
            });
    }
    isLogined(): Observable<any> {
        const token = localStorage.getItem('token');
        if (!token) {
            return of(false);
        }
        const headers = new HttpHeaders().set('x-token', token);
        return this.http.get(environment.api + '/user', { headers: headers })
            .map((res: any) => {
                const token = res.token;
                this.user = res.user;
                localStorage.setItem('token', token);
                return of(true);
            });
    }

    addProduct(product): Observable<any> {
        const token = localStorage.getItem('token');
        if (!token) {
            return of(false);
        }
        const headers = new HttpHeaders().set('x-token', token);
        return this.http.post(environment.api + '/products', product, { headers: headers })
            .map((res: any) => {
                return res;
            });
    }

    updateProduct(product, id): Observable<any> {
        const token = localStorage.getItem('token');
        if (!token) {
            return of(false);
        }
        const headers = new HttpHeaders().set('x-token', token);
        return this.http.put(environment.api + '/products/' + id, product, { headers: headers })
            .map((res: any) => {
                return res;
            });
    }

    register(params): Observable<any> {
        return this.http.post(environment.api + '/user/register', params)
            .map((res: any) => {
                return res;
            });
    }
    delete(id) {
        const token = localStorage.getItem('token');
        if (!token) {
            return of(false);
        }
        const headers = new HttpHeaders().set('x-token', token);
        return this.http.delete(environment.api + '/products/' + id, { headers: headers })
            .map((res: any) => {
                return res;
            });
    }
}
