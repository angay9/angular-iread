import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Clone the request to add the new header
        const clonedRequest = req.clone({ headers: req.headers.set('Authorization', `Bearer ${AuthService.getToken()}`) });

        // Pass the cloned request instead of the original request to the next handle
        return next.handle(clonedRequest);
    }
}
