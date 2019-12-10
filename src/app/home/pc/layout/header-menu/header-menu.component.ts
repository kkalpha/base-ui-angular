import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/home/services/menu.service';
import { SettingService } from 'src/app/uilib/services/setting.service';


@Component({
    selector: 'header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.less']
})
export class HeaderMenuComponent implements OnInit, OnDestroy {
    menuData = {
        'children': [
            {
                'children': [
                    {
                        'text': 'test',
                        'url': '',
                        'selected': false
                    }
                ],
                'description': 'desc',
                'expanded': false,
                'mid': 1,
                'text': 'test'
            }
        ]
    };
    menuDataSubscription: Subscription;

    constructor(
        private menuService: MenuService,
        public msgSrv: NzMessageService,
        public setting: SettingService
    ) { }

    ngOnInit(): void {
        this.menuDataSubscription = this.menuService.menuDataAvailableSubject.subscribe(
            (val: any) => {
                if (val) {
                    this.menuData = this.menuService.menuData;
                }
            }
        );
    }
    ngOnDestroy(): void {
        this.menuDataSubscription.unsubscribe();
    }
    showIcon(icon): string {
        if (icon && icon !== '') {
            return icon;
        } else {
            return 'anticon anticon-appstore-o';
        }
    }
}
