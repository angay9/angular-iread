export class BooksTransformer {
    fetch(data) {
        return {
            id: data['id'],
            external_id: data['external_id'],
            title: data['title'],
            authors: data['authors'],
            description: data['description'],
            preview_link: data['preview_link'],
            categories: data['categories'],
            page_count: data['page_count'],
            publish_date: data['publish_date'],
            publisher: data['publisher'],
            thumbnail: data['thumbnail'],
        };
    }

    send(data) {
        return {
            id: data['id'],
            external_id: data['external_id'],
            title: data['title'],
            authors: data['authors'],
            description: data['description'],
            preview_link: data['preview_link'],
            categories: data['categories'],
            page_count: data['page_count'],
            publish_date: data['publish_date'],
            publisher: data['publisher'],
            thumbnail: data['thumbnail'],
        };
    }
}
