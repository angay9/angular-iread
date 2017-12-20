import { CanActivate } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(protected authService: AuthService) {

    }

    canActivate() {
        return this.authService.isLoggedIn();
    }
}
