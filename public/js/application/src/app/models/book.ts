import { Model } from "./model";

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

    constructor(attributes: Object) {
        super(attributes); 

        this.id = attributes['id'];
        this.external_id = attributes['external_id'];
        this.title = attributes['title'];
        this.authors = attributes['authors'] ? attributes['authors'] : [];
        this.description = attributes['description'];
        this.preview_link = attributes['preview_link'];
        this.categories = attributes['categories'] ? attributes['categories'] : [];
        this.page_count = attributes['page_count'];
        this.publish_date = attributes['publish_date'];
        this.publisher = attributes['publisher'];
        this.thumbnail = attributes['thumbnail'];
        
    }
}