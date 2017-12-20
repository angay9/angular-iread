import { Component, OnInit } from '@angular/core';
import Paginator from '../../../lib/pagination/paginator.js';
import { BooksService } from '../../services/books/books.service';
import { Book } from '../../models/book';

@Component({
    selector: 'app-shelves',
    templateUrl: './shelves.component.html',
    styleUrls: ['./shelves.component.scss'],

})
export class ShelvesComponent implements OnInit {

    userBooks = new Paginator({
        count: 0,
        limit: 10000000,
        totalPages: 0,
        currentPage: 0,
    });


    constructor(
        protected booksService: BooksService
    ) {
    }

    ngOnInit() {
        this.loadUserBooks();
    }

    loadUserBooks() {
        this.booksService.getUserBooks()
            .subscribe((res:any) => {

                let books = Array.prototype.slice.call(res.books);

                this.userBooks.items.items = books.map(book => new Book(book));

            }, err => {

            })
        ;

    }

    markAsRead(event, book, read = true) {
        event.preventDefault();

        this.booksService.markAsRead(book, read)
            .subscribe((res:any) => {
                book.setIsRead(read);

                if (res.user_book) {
                    book.user_books.push(res.user_book);
                }
            }, err => {
                alert('Error occured.');
            });
    }

    rateBook(event, book, rating) {
        event.preventDefault();

        this.booksService.rate(book, rating)
            .subscribe((res:any) => {

                if (res.user_book) {
                    book.user_books.push(res.user_book);
                }

                book.setRating(rating);
                // alert('Book has been rated');
            }, err => {
                alert('Error occured. ');
            })
        ;
    }

}
