import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../../services/google/google.service';
import Paginator from '../../../lib/pagination/paginator.js';
import { BooksService } from '../../services/books/books.service';
import _ from "lodash";
import { Book } from '../../models/book';

@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
    books = new Paginator({
        count: 0,
        limit: 10,
        totalPages: 0,
        currentPage: 0
    });

    search = '';

    constructor(
        protected booksService: BooksService,
        protected googleService: GoogleService
    ) { }

    ngOnInit() {
    }

    searchBooks() {
        this.loadBooks(this.search);
    }

    loadBooks(query, limit = 6, currentPage = null) {

        this.googleService.getBooks(query, limit, currentPage ? currentPage : this.books.currentPage)
            .subscribe(response => {
                let responseJson = response.json();
                let items = Array.prototype.slice.call(responseJson.items);
                let books = _.map(items, item => Book.fromGoogleData(item));


                this.books.setOptions({
                    count: responseJson.totalItems,
                    limit: limit,
                    totalPages: Math.ceil(responseJson.totalItems / 10),
                    currentPage: currentPage ? currentPage : this.books.currentPage
                });

                this.books.items.items = books;
            })
            ;
        // console.log(userBooks.items);
    }

    setBooksPage(event) {
        this.books.setOptions({
            currentPage: event.page
        });

        this.loadBooks(this.search);

    }

    addToShelf(event, book) {
        event.preventDefault();

        this.booksService.addToShelf(book)
            .subscribe(res => {
                alert('Added to shelf');
            }, err => {
                let message = err.json().message;
                let showError = err.status >= 400 && err.status <= 499;
                alert(message && showError ? message : 'Error occured');
            })
        ;
    }

}
