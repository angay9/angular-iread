import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import _ from "lodash";

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
    private _pages: Array<Number>;
    private _activePage: number;

    @Output()
    public onPaginationItemClicked = new EventEmitter();

    @Input() simple = false;

    @Input()
    set activePage(page: number) {
        if (page < 1) {
            page = 1;
        }

        this._activePage = page;
    }

    get activePage() {
        return this._activePage;
    }

    @Input()
    set pages(pages: any) {
        if (!Array.isArray(pages)) {
            this._pages = _.range(1, parseInt(pages, 10));
        }
    }

    get pages() {
        return this._pages;
    }

    constructor() { }

    get prevDisabled() {
        return this.activePage === 1;
    }

    get nextDisabled() {
        return this.activePage === this.pages.length;
    }

    ngOnInit() {
    }

    onPageChange(event, page) {

        event.preventDefault();
        this.onPaginationItemClicked.emit({
            page
        });
    }

}
