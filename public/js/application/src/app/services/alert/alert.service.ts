import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Alert } from '../../models/alert';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlertService {
    protected subject = new Subject<Alert>();

    constructor(protected router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                // clear alert messages
                this.clear();
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, autoDismiss: number | boolean = 3000) {
        this.alert(Alert.success, message, autoDismiss);
    }

    error(message: string, autoDismiss: number | boolean = 3000) {
        this.alert(Alert.error, message, autoDismiss);
    }

    info(message: string, autoDismiss: number | boolean = 3000) {
        this.alert(Alert.info, message, autoDismiss);
    }

    warn(message: string, autoDismiss: number | boolean = 3000) {
        this.alert(Alert.warning, message, autoDismiss);
    }

    alert(type: string, message: string, autoDismiss: number|boolean = 3000) {

        this.subject.next(<Alert>{ type: type, message: message });

        if (autoDismiss !== false) {
            setTimeout(() => {
                this.clear();
            }, autoDismiss);
        }
    }

    clear() {
        // clear alerts
        this.subject.next();
    }

}
