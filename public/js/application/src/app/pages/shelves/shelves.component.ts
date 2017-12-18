import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import Paginator from '../../../lib/pagination/paginator.js';
import _ from "lodash";
import { BooksService } from '../../services/books/books.service';
import { Book } from '../../models/book';

@Component({
    selector: 'app-shelves',
    templateUrl: './shelves.component.html',
    styleUrls: ['./shelves.component.scss']
})
export class ShelvesComponent implements OnInit {
    books: Paginator;
    search: String = '';

    constructor(
        protected http: Http,
        protected booksService: BooksService
    ) {
    }

    ngOnInit() {
        this.books = new Paginator({
            count: 0,
            limit: 10,
            totalPages: 0,
            currentPage: 0
        });
    }

    searchBooks() {
        this.loadBooks(this.search);
    }

    loadBooks(query, limit = 21, currentPage = null) {

        this.http
            .get(`https://www.googleapis.com/books/v1/volumes?q=${query.replace(' ', '+')}&startIndex=${this.books.currentPage}&maxResults=${limit}`)
            .subscribe(response => {
                let responseJson = response.json();
                let items = Array.prototype.slice.call(responseJson.items);

                this.books.items.setItems(
                    _.map(items, item => new Book({
                        id: null,
                        external_id: item.id,
                        title: item.volumeInfo.title,
                        authors: item.volumeInfo.authors,
                        description: item.volumeInfo.description,
                        preview_link: item.volumeInfo.previewLink,
                        categories: item.volumeInfo.categories,
                        page_count: item.volumeInfo.pageCount,
                        publish_date: item.volumeInfo.publishedDate,
                        publisher: item.volumeInfo.publisher,
                        thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '',
                    }))
                );

                this.books.setOptions({
                    count: responseJson.totalItems,
                    limit: limit,
                    totalPages: Math.ceil(responseJson.totalItems / 10),
                    currentPage: currentPage ? currentPage : this.books.currentPage
                }, true);
            })
            ;
    }

    setBooksPage(event) {
        this.books.setOptions({
            currentPage: event.page
        });

        this.loadBooks(this.search);

    }

    markAsRead(event, book) {
        event.preventDefault();
        this.booksService.markAsRead(book)
            .subscribe(res => {
                alert('Book has been set as read');
            }, err => {
                alert('Error occured. ' + err.message);
            });
    }

    rateBook(event, book, rating) {
        event.preventDefault();

        this.booksService.rate(book, rating)
            .subscribe(res => {
                alert('Book has been rated');
            }, err => {
                alert('Error occured. ' + err.message);
            })
        ;
    }
}
