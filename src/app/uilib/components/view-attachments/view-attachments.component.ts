import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'view-attachments',
    templateUrl: 'view-attachments.component.html',
    styles: [`
        li {
            padding: 10px;
        }
    `]
})

export class ViewAttachmentsComponent implements OnInit {
    @Input() id: any;
    @Input() fileType: string;
    attachments = [];

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit() {
        this.getAttachments();
    }

    getAttachments() {
        if (this.id) {
            const path = `appbiz/file/${this.fileType}/${this.id}`;
            this.apiService.callApi(this.apiService.get(path),
            (res) => {
                this.attachments = res.data;
            }, null, true);
        }
    }
}
