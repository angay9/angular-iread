import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const apiReq = req.clone({ url: `${environment.apiUrl}/${req.url}` });

        return next.handle(apiReq);
    }
}
