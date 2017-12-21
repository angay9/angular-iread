import { Model } from "./model";

export class Alert extends Model {
    static success = 'success';
    static error = 'error';
    static info = 'info';
    static warning = 'warning';

    type: 'info';
    message: '';
}
