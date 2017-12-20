import { CanActivate } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class GuestGuard implements CanActivate {

    constructor(protected authService: AuthService) {

    }

    canActivate(): Observable<boolean> {
        // return Observable.of(true);
        return this.authService.isLoggedIn().do(res => {
            return Observable.of(!res);
        });
    }
}
