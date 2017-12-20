import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    email: '';
    password: '';

    constructor(protected authService: AuthService, protected router: Router) { }

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
            if (err.status < 500) {
                alert('Error ' + err.json().message);
            } else {
                alert('Error');
            }
        });
    }
}
