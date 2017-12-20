import { List } from '../list/list';

export default class Paginator {
    items = new List([]);
    count = 0;
    currentPage = 0;
    limit = 0;
    totalPages = 0;

    /**
     * Constructor
     *
     * @param  {Object} options
     * @return {void}
     */
    constructor(options) {
        this.setOptions(options);
    }

    /**
     * Set options
     *
     * @param  {Object} options
     * @return {void}
     */
    setOptions(options) {

        if (options.items !== undefined) {
            this.items = options.items;
        }
        if (options.count !== undefined) {
            this.count = options.count;
        }

        if (options.currentPage !== undefined) {
            this.currentPage = options.currentPage;
        }

        if (options.limit !== undefined) {
            this.limit = options.limit;
        }
        if (options.totalPages !== undefined) {
            this.totalPages = options.totalPages;
        }
    }

    /**
     * Check if paginator has more items
     *
     * @return {Boolean}
     */
    hasMore() {
        return this.currentPage < this.totalPages;
    }

    getOptions() {
        let options = {
            count: this.count,
            limit: this.totalPages,
            totalPages: this.totalPages,
            currentPage: this.currentPage
        };

        return options;
    }

}
