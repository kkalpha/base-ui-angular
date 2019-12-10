import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../../node_modules/rxjs';
import { AlertParams } from '../../services/handler.service';

@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {
    @Input() alertParams: AlertParams;

    subscription: Subscription;

    constructor(
        private el: ElementRef
    ) {}

    ngOnInit() {
        this.subscription = this.alertParams.showAlertSubject.subscribe(
            item => this.el.nativeElement.scrollIntoView(false)
        );
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
