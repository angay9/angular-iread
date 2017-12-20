import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GoogleService {

    constructor(protected http: Http) { }

    getBooks(query, limit = 10, currentPage = 1) {
        let baseUrl = 'https://www.googleapis.com/books/v1/volumes';
        return this.http
          .get(`${baseUrl}?q=${query.replace(' ', '+')}&startIndex=${currentPage}&maxResults=${limit}`)
        ;
    }

}
