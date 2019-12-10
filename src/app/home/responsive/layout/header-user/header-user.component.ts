import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/uilib/auth/auth.service';
import { HandlerService } from 'src/app/uilib/services/handler.service';
import { ApiService } from 'src/app/uilib/services/api.service';
import { SettingService } from 'src/app/uilib/services/setting.service';

@Component({
    selector: 'header-user',
    templateUrl: './header-user.component.html',
    styleUrls: ['./header-user.component.less']
})
export class HeaderUserComponent implements OnInit {
    constructor(
        private router: Router,
        private authService: AuthService,
        private handlerService: HandlerService,
        private apiService: ApiService,
        public setting: SettingService
    ) { }

    userName: string;

    ngOnInit(): void {
        this.userName = this.authService.getLoginUser();
    }

    logout() {
        this.apiService.doLogout();
    }
}
