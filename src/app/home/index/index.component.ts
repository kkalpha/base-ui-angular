import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../uilib/services/api.service';
import { SettingService } from '../../uilib/services/setting.service';

@Component({
    selector: 'app-index',
    templateUrl: 'index.component.html',
    styleUrls: ['./index.component.less']
})

export class IndexComponent implements OnInit {


    constructor(
        private apiService: ApiService,
        public setting: SettingService
    ) { }

    ngOnInit() {
    }


}
