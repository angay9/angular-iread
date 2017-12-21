import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books/books.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    userActivity: any[]

    constructor(
        protected booksService: BooksService
    ) {

    }

    ngOnInit() {
        this.loadUserActivity();
    }

    loadUserActivity() {
        this.booksService
            .loadUserActivity()
            .subscribe((res:any) => {
                this.userActivity = res.data;
            }, err => {
                alert('error occured');
            })
        ;
    }
}
