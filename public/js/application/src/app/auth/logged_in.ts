import { CanActivate } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(protected authService: AuthService, protected router: Router) {

    }

    canActivate(): Observable<boolean> {
        // return Observable.of(true);
        return this.authService
            .isLoggedIn()
            .do(result => {
                if (result === false) {
                    this.router.navigate(['login']);
                }

                return result;
            }, err => {
                this.router.navigate(['login']);

                return false;
            })
        ;
    }
}
