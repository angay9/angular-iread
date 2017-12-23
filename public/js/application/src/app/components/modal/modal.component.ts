import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    protected modalId = '';

    protected $modal: any;

    @Output()
    public onModalSaveClicked = new EventEmitter();

    @Input() title = '';
    @Input() saveBtnText = 'Save';
    @Input() closeBtnText = 'Close';

    constructor() {
        this.modalId = Math.random().toString(36).substr(2, 10);
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

        this.$modal = window.$(`#${this.modalId}`);
    }

    getModalId() {
        return this.modalId;
    }

    modalSaveClicked() {
        this.onModalSaveClicked.emit({});
    }

    open() {
        this.$modal.modal('show');
        // this.open = true;
    }

    close() {
        this.$modal.modal('hide');
        // this.open = false;
    }

}
