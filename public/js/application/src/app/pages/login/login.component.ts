import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import { formatValidationErrors } from '../../helpers/format_validation_errors';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    email: '';
    password: '';

    constructor(
        protected authService: AuthService,
        protected router: Router,
        protected alertService: AlertService
    )
    { }

    ngOnInit() {
    }

    login() {
        this.authService.login({
            email: this.email,
            password: this.password
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
            if (err.status == 401) {

                this.alertService.error('Error: ' + err.error.message);
            }
        });
    }
}
