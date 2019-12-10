import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class HandlerService {
    public pageParams: AlertParams = new AlertParams();
    public modalParams: AlertParams = new AlertParams();

    constructor(private router: Router) { }

    handleException(code: number, exceptionId: string, msg: string, isModal: boolean = false) {

        if (isModal) {
            this.setModalParams(true, 'error', msg);
        } else {
            this.setPageParams(true, 'error', msg);
        }
    }

    handleSuccess(msg: string, isModal: boolean = false) {
        if (isModal) {
            this.setModalParams(true, 'success', msg);
        } else {
            this.setPageParams(true, 'success', msg);
        }
    }

    setPageParams(show: boolean, type?: string, msg?: string) {
        this.pageParams.type = type;
        this.pageParams.msg = msg;
        this.pageParams.display(show);
    }

    setModalParams(show: boolean, type?: string, msg?: string) {
        this.modalParams.type = type;
        this.modalParams.msg = msg;
        this.modalParams.display(show);
    }

    closeAlert(): void {
        this.pageParams.show = false;
        this.modalParams.show = false;
    }
}

export class AlertParams {
    show = false;
    type = '';
    msg = '';

    showAlertSubject = new Subject<boolean>();

    display(show: boolean) {
        this.show = show;
        if (show) {
            this.showAlertSubject.next(this.show);
        }

    }
}
