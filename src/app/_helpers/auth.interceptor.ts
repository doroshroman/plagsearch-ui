import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const accessToken = this.token.getAccessToken();

        
        if (accessToken != null) {
            const headers = new HttpHeaders({
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            })
            authReq = req.clone({headers: headers});
        }
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];