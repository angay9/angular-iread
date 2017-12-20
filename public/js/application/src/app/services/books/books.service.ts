import { Injectable } from '@angular/core';

import { BooksTransformer } from '../../transformers/books.transformer';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BooksService {
    transformer = new BooksTransformer();

    constructor(protected http: HttpClient) {}

    markAsRead(book, isRead = true) {

        return this.http.post(
            `books/read/save/${book.external_id}`,
            {book: this.transformer.send(book), isRead}
        );
    }

    rate(book, rating) {

        return this.http.post(
            `books/rate/${book.external_id}`,
            { book: this.transformer.send(book), rating }
        );
    }

    getUserBooks(userId = null) {
        return this.http.get(
            `user/books${userId ? '/' + userId : ''}`
        );
    }

    addToShelf(book) {
        return this.http.post(
            `books/addToShelf/${book.external_id}`,
            { book: this.transformer.send(book) }
        );
    }

    loadUserActivity() {
        return this.http.get(
            'user/activity'
        );
    }
}
