import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 

@Injectable()
export class BooksService {

  constructor(protected http: Http) {}

  markAsRead(book) {
    return this.http.post(`http://localhost:8000/api/books/read/save/${book.external_id}`, {book: book});
  }
}
