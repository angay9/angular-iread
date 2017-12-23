import { Model } from "./model";
import _ from "lodash";


export class Book extends Model {
    id: 0;
    external_id: '';
    title: '';
    description: '';
    authors: string[];
    preview_link: '';
    categories: string[];
    page_count: 0;
    publish_date: '';
    publisher: '';
    thumbnail: '';
    user_books: any[];

    constructor(attributes: Object) {
        super(attributes);

        this.id = attributes['id'];
        this.external_id = attributes['external_id'];
        this.title = attributes['title'] ? attributes['title'] : '';
        this.authors = attributes['authors'] ? attributes['authors'] : [];
        this.description = attributes['description'] ? attributes['description'] : '';
        this.preview_link = attributes['preview_link'] ? attributes['preview_link'] : '';
        this.categories = attributes['categories'] ? attributes['categories'] : [];
        this.page_count = attributes['page_count'] ? attributes['page_count'] : 0;
        this.publish_date = attributes['publish_date'] ? attributes['publish_date'] : '';
        this.publisher = attributes['publisher'] ? attributes['publisher'] : '';
        this.thumbnail = attributes['thumbnail'] ? attributes['thumbnail'] : '';

        this.user_books = attributes['user_books'] ? attributes['user_books'] : [];
    }

    static fromGoogleData(item: any) {
        let book = new Book({
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
        });

        return book;
    }

    attachUserBooks(userBooks: any[]) {
        this.user_books = userBooks;
    }

    getUserBooksObj(predicate: any) {
        if (!this.user_books || this.user_books.length == 0) {
            return null;
        }

        return _.find(this.user_books, predicate);
    }

    // Meta properties
    getRating() {
        let ratingObj = this.getUserBooksObj({ 'action_name': 'rated' });

        return ratingObj ? parseInt(ratingObj['action_value'], 10) : null;
    }

    setRating(rating) {
        let ratingObj = this.getUserBooksObj({ 'action_name': 'rated' });

        if (ratingObj) {
            ratingObj['action_value'] = rating;
        }

        return this;
    }

    isRead() {
        let isReadObj = this.getUserBooksObj({'action_name': 'read'});

        return isReadObj ? !!parseInt(isReadObj['action_value'], 10) : false;
    }

    setIsRead(isRead: boolean) {
        let isReadObj = this.getUserBooksObj({ 'action_name': 'read' });

        if (isReadObj) {
            isReadObj['action_value'] = isRead;
        }

        return this;
    }

    setReview(review) {
        let ratingObj = this.getUserBooksObj({ 'action_name': 'reviewed' });

        if (ratingObj) {
            ratingObj['action_value'] = review;
        }

        return this;
    }

    // Meta properties
    getReview() {
        let ratingObj = this.getUserBooksObj({ 'action_name': 'reviewed' });

        return ratingObj ? ratingObj['action_value'] : null;
    }

}
