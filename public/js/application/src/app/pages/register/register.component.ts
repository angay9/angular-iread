import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    name: '';
    email: '';
    password: '';
    passwordConfirmation: '';

    constructor(protected authService: AuthService, protected router: Router) { }

    ngOnInit() {
    }

    register() {
        this.authService.register({
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation
        })
        .subscribe(res => {
                return this.router.navigate(['dashboard']);
            }, err => {

            })
        ;
    }

}
