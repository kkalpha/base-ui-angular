import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../../uilib/services/api.service';


@Injectable()
export class MasterDataService {
    personalInfoData: any;
    personalInfoUpdatedSubject: Subject<boolean>;

    constructor(private apiService: ApiService) {
        this.personalInfoUpdatedSubject = new Subject<boolean>();
    }

    fetchPersonalInfoData() {

        this.apiService.callApi(this.apiService.get('appbiz/etravel/master/personal'),
            (res: any) => {
                this.personalInfoData = res.data;
                this.personalInfoUpdatedSubject.next(true);
            }
        );
    }
    getPersonalInfoData() {
        return this.personalInfoData;
    }

}

