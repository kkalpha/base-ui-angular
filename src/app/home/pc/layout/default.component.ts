import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, NavigationError, NavigationEnd } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { SettingService } from 'src/app/uilib/services/setting.service';
import { MenuService } from '../../services/menu.service';

@Component({
    selector: 'app-layout-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.less']
})
export class LayoutDefaultComponent implements OnInit {
    // isCollapsed = false;
    showMenuAlert = false;
    isFetching = false;
    isFull = false;

    constructor(
        private router: Router,
        public setting: SettingService,
        private _message: NzMessageService,
        private location: Location,
        private menuService: MenuService
    ) {
        // scroll to top in change page
        router.events.subscribe(evt => {
            if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
                this.isFetching = true;
            }
            if (evt instanceof NavigationError) {
                this.isFetching = false;
                _message.error(`unable to load ${evt.url}`, { nzDuration: 1000 * 3 });
                return;
            }
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            setTimeout(() => {
                this.isFetching = false;
            }, 100);
        });
    }

    ngOnInit() {
        this.menuService.fetchMenuData();
    }

    onMenuDataReadyEvent(menuData: any) {
        let hasAccess = false;
        if (menuData && menuData.length > 0) {
            this.showMenuAlert = false;
            const locationPath = this.location.path();
            menuData.forEach(menuGroup => {
                if (menuGroup && menuGroup.children) {
                    menuGroup.children.forEach(menu => {
                        if (locationPath === menu.url) {
                            hasAccess = true;
                        }
                    });
                }
            });
        } else {
            this.showMenuAlert = true;
        }
        if (!hasAccess) {
            this.router.navigateByUrl('pc');
        }
    }

    showFullView() {
        this.isFull = !this.isFull;
    }
}
