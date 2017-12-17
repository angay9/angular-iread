import _ from "lodash";

export class List {
    items: any[];
    
    /**
     * Constructor
     *
     * @param  {Object} options
     * @return {void}
     */
    constructor(options) {
        let opts = Object.assign({}, options, {
            items: []
        });

        this.items = opts.items;
    }

    /**
     * Clear collection
     */
    clear() {
        this.setItems([]);

        return this;
    }

    /**
     * Set items
     *
     * @param {Array} items
     */
    setItems(items) {
        this.items = items;
    }

    /**
     * Get underlying list of items
     *
     * @return {array}
     */
    getItems() {
        return this.items;
    }

    /**
     * Add new item
     *
     * @param {Mixed} item
     */
    add(item) {
        return this.push(item);
    }

    /**
     * Remove item
     *
     * @param  {Mixed} item
     * @return {Boolean}
     */
    remove(item) {
        if (item instanceof Array) {
            item.forEach(i => {
                this.remove(i);
            });

            return true;
        }

        let index = this.items.indexOf(item);

        if (index > -1) {
            this.items.splice(index, 1);

            return true
        }

        return false;
    }


    /**
     * Find item by given predicate
     * 
     * @param {*Mixed} predicate 
     */
    find(predicate) {
        let index = _.findIndex(this.items, predicate);

        return index > -1 ? this.items[index] : null;
    }

    /**
     * Find item by given predicate (https://lodash.com/docs/4.17.4#findIndex)
     * and update using updateFunc
     *
     * @param  {Mixed} predicate
     * @param  {function} updateFunc
     * @return {Boolan}
     */
    findAndUpdate(predicate, updateFunc) {
        let index = _.findIndex(this.items, predicate);
        if (index > -1) {
            updateFunc(this.items[index]);

            return true;
        }

        return false;
    }


    /**
     * Check if item is in list
     *
     * @param  {Mixed} item
     * @return {Boolean}
     */
    inList(item) {
        let index = this.items.indexOf(item);

        return index !== -1;
    }

    /**
     * Add or remove item
     *
     * @param {Mixed} item
     */
    addOrRemove(item) {

        if (item instanceof Array) {
            item.forEach(i => {
                this.addOrRemove(i);
            });

            return;
        }

        if (this.inList(item)) {
            return this.remove(item);
        }

        return this.push(item);
    }

    /**
     * Push new items with the old ones
     *
     * @param  {array} newItems
     * @return {List}
     */
    push(newItems) {

        if (newItems instanceof Array) {
            newItems.forEach(item => {
                this.items.push(item);
            });

            return this;
        }

        return this.items.push(newItems);
    }

    /**
     * Get all items count
     *
     * @return {Integer}
     */
    count() {
        return this.items.length;
    }

    /**
     * Get all items
     *
     * @return {Array}
     */
    all() {
        return this.items;
    }

    /**
     * Execute function for each item
     * 
     * @param {*Function} func
     */
    forEach(func) {
        this.items.forEach(func);

        return this;
    }

    /**
     * Chunk size into chunks
     * 
     * @param {*Number} size 
     */
    chunk(size) {
        return _.chunk(this.items, size);
    }
}
