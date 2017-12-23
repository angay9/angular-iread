import { Component, OnInit, ViewChild } from '@angular/core';
import Paginator from '../../../lib/pagination/paginator.js';
import { BooksService } from '../../services/books/books.service';
import { Book } from '../../models/book';
import { ModalComponent } from '../../components/modal/modal.component';
import { AlertService } from '../../services/alert/alert.service';
import { formatValidationErrors } from '../../helpers/format_validation_errors';


@Component({
    selector: 'app-shelves',
    templateUrl: './shelves.component.html',
    styleUrls: ['./shelves.component.scss'],

})
export class ShelvesComponent implements OnInit {

    protected userBooks = new Paginator({
        count: 0,
        limit: 10000000,
        totalPages: 0,
        currentPage: 0,
    });

    protected book: any;
    protected showRateModal:boolean = false;
    protected review = '';

    @ViewChild('modal')
    protected modal: ModalComponent;

    constructor(
        protected booksService: BooksService,
        protected alertService: AlertService
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
                this.alertService.error('Error occured.');
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
                this.alertService.error('Error occured. ');
            })
        ;
    }

    openReviewModal(e, book) {
        e.preventDefault();

        this.book = book;
        this.review = book.getReview();

        this.modal.open();
    }

    reviewBook() {
        this.booksService.review(this.book, this.review)
            .subscribe((res:any) => {
                if (res.user_book) {
                    this.book.user_books.push(res.user_book);
                }

                this.book.setReview(this.review);

                this.modal.close();
                this.book = null;
                this.review = '';
            }, err => {
                if (err.status == 422) {

                    this.alertService.error(
                        formatValidationErrors(err.error.errors),
                        5000
                    );

                    return;
                }
            })
        ;

        // this.modal.close();
    }

}
