import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import { formatValidationErrors } from '../../helpers/format_validation_errors';

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

    constructor(
        protected authService: AuthService,
        protected router: Router,
        protected alertService: AlertService
    ) {

    }

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
                if (err.status == 422) {

                    this.alertService.error(
                        formatValidationErrors(err.error.errors), false
                    );

                    return;
                }

                this.alertService.error('Error. Please try again later');
            })
        ;
    }

}
