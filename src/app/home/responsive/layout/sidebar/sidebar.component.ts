import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/home/services/menu.service';
import { SettingService } from 'src/app/uilib/services/setting.service';



@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit, OnDestroy {
    @Input() device: string;
    @Output() private menuDataReadyEvent = new EventEmitter();

    @Output() private itemClickEvent = new EventEmitter();
    // default menus
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

    currentPath: string;

    constructor(
        private menuService: MenuService,
        public msgSrv: NzMessageService,
        public setting: SettingService,
        private location: Location) {
    }

    ngOnInit(): void {
        this.currentPath = this.location.path();
         this.menuDataSubscription = this.menuService.menuDataAvailableSubject.subscribe(
            (val: any) => {
                if (val) {
                    this.menuData = this.menuService.menuData;
                    this.menuDataReadyEvent.emit(this.menuData.children); // TODO
                    this.checkOpen();
                }

            }
        );
    }

    ngOnDestroy(): void {
        this.menuDataSubscription.unsubscribe();
    }

    // expand the submenu when the item url equals the route url
    checkOpen() {
        let isOpen = false;
        this.menuData.children.forEach(menu => {
            menu.children.forEach(item => {
                if (item.url === this.currentPath) {
                    item.selected = true;
                    menu.expanded = true;
                    isOpen = true;
                }
            });
        });
        if (this.menuData.children.length > 0 && !isOpen) {
            this.menuData.children[0].expanded = true;
        }
    }

    closeOtherMenu = (data: any) => {
        this.menuData.children.forEach(menu => {
            menu.expanded = false;
        });
        data.expanded = true;
    }

    showIcon(icon): string {
        if (icon && icon !== '') {
            return icon;
        } else {
            return 'hdd';
        }
    }
    onItemClick(event) {
        this.itemClickEvent.emit();
    }
}
