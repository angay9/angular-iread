import { List } from '../list/list';

export default class Paginator {
    items = new List([]);
    count = 0;
    currentPage: 0;
    limit: 0;
    totalPages: 0;

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
    setOptions(options, ignoreMissing = false) {
        
        let opts = {};
        if (!ignoreMissing) {
            opts = Object.assign({}, {
                items: new List([]),
                count: 0,
                currentPage: null,
                limit: null,
                totalPages: null
            }, options);
        } else {
            opts = options;
        }

        Object.keys(opts).forEach(key => {
            this[key] = opts[key];
        });
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
