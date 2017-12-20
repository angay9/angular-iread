import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
    constructor(protected http: HttpClient) { }

    login(credentials) {
        return this.http.post(`login`, {
            email: credentials['email'],
            password: credentials['password']
        }).do((res:any) => {

            this.setUserDataToStorage(
                res.data.user,
                res.data.token
            );
        });;
    }

    logout() {
        return this.http.post(`logout`, {token: AuthService.getToken()})
            .do(res => {
                this.removeUserDataFromStorage();
            })
        ;
    }


    register(data) {
        return this.http.post(`register`, data)
            .do((res:any) => {
                this.setUserDataToStorage(
                    res.data.user,
                    res.data.token
                );
            })
        ;
    }


    static getToken() {
        return localStorage.getItem('jwtToken');
    }

    getToken() {
        return AuthService.getToken();
    }

    getUser() {

        let user = localStorage.getItem('user');
        if (!user) {
            return null;
        }

        return JSON.parse(user);
    }

    isUserPresent() {
        return !!this.getUser();
    }

    isLoggedIn(): Observable<boolean> {

        let token = AuthService.getToken();

        if (!token) {
            return Observable.of(false);
        }

        return this.http.get('auth/check')
            .map(res => {
                return true;
            }, err => {
                return false;
            })
        ;

        // return user !== null && token !== null;
    }

    loginUsingToken() {
        return this.http.get('auth/check')
            .map((res:any) => {
                this.setUserDataToStorage(res.user, res.token);

                return true;
            }, err => {
                return false;
            })
        ;
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
