import { CanActivate } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { Injectable } from '@angular/core';

@Injectable()
export class GuestGuard implements CanActivate {

    constructor(protected authService: AuthService) {

    }

    canActivate() {
        // return true;
        return !this.authService.isLoggedIn();
    }
}
