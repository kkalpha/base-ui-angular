import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../../uilib/services/api.service';


@Injectable()
export class MenuService {

    menuData: any = {};
    menuDataAvailableSubject: Subject<boolean>;
    constructor(private apiService: ApiService) {
        this.menuDataAvailableSubject = new Subject<boolean>();
    }

    fetchMenuData() {

        this.apiService.callApi(this.apiService.get('appbiz/menu'),
            (res: any) => {
                this.menuData = res.data;
                this.menuDataAvailableSubject.next(true);
            }
        );
    }
    getMenuData() {
        return this.menuData;
    }

}

