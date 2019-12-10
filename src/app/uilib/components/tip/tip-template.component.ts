import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tip-template',
    templateUrl: './tip-template.component.html',
    styleUrls: ['./tip-template.component.less']
})

export class TipComponent implements OnInit {

    @Input() title: any;
    @Input() content: any;
    @Input() backTo: any;

    constructor(
        private modalRef: NzModalRef,
        private router: Router
    ) { }

    ngOnInit() { }

    confirm() {
        this.modalRef.destroy();
        if (this.backTo) {
            this.router.navigate([this.backTo]);
        }
    }
}