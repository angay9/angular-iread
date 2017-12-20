import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(protected authService: AuthService, protected router: Router) { }

    ngOnInit() {
    }

    logout(e) {
        e.preventDefault();
        this.authService.logout()
            .subscribe(res => {
                this.router.navigate(['login']);
            }, err => {
                alert('Error when logging out');
            })
        ;
    }
}
