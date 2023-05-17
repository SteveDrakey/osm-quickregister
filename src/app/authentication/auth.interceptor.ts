import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Only intercept requests to /.netlify/functions
        console.log('AuthInterceptor', request.url);
        
        if (request.url.startsWith('/.netlify/functions') ) {
            const token = localStorage.getItem('accesstoken');
            console.log('AuthInterceptor token', token);
            if (token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        }
        return next.handle(request);
    }
}
