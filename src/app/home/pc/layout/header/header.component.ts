import { Component } from '@angular/core';
import { SettingService } from 'src/app/uilib/services/setting.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent {
    searchToggleStatus: boolean;

    constructor(
        public setting: SettingService
    ) { }

    toggleCollapsedSideabar() {
        this.setting.setLayout('sideCollapsed', !this.setting.layout.sideCollapsed);
    }

    toggleCollapsedHeaderMenu() {
        this.setting.setLayout('headerCollapsed', !this.setting.layout.headerCollapsed);
    }
}
