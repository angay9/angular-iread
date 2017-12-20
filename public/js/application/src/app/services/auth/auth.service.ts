import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
    constructor(protected http: Http) { }

    login(credentials) {
        return this.http.post(`http://angular-iread.local/api/login`, {
            email: credentials['email'],
            password: credentials['password']
        }).do(res => {
            this.setUserDataToStorage(
                res.json().data.user,
                res.json().data.token
            );
        });;
    }

    logout() {
        return this.http.post(`http://angular-iread.local/api/logout`, {token: this.getToken()})
            .do(res => {
                this.removeUserDataFromStorage();
            })
        ;
    }

    register(data) {
        return this.http.post(`http://angular-iread.local/api/register`, data)
            .do(res => {
                this.setUserDataToStorage(
                    res.json().data.user,
                    res.json().data.token
                );

            })
        ;
    }


    getToken() {
        return localStorage.getItem('jwtToken');
    }

    getUser() {
        let user = localStorage.getItem('user');
        if (!user) {
            return null;
        }

        return JSON.parse(user);
    }

    isLoggedIn(): Observable<boolean> {
        let token = this.getToken();

        if (!token) {
            return Observable.of(false);
        }

        let headers = new Headers({ 'Authorization': 'Bearer ' + token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get('http://angular-iread.local/api/auth/check', options)
            .map(res => {
                return true;
            }, err => {
                return false;
            })
        ;

        // return user !== null && token !== null;
    }

    protected setUserDataToStorage(user: Object, jwtToken: string) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('jwtToken', jwtToken);
    }

    protected removeUserDataFromStorage() {
        localStorage.removeItem('user');
        localStorage.removeItem('jwtToken');
    }

}
