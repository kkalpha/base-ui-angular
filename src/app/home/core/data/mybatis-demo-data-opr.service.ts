import { Injectable } from "@angular/core";
import { DemoDataOpr } from "./model";
import { ApiService } from "src/app/uilib/services/api.service";
import { Observable } from "rxjs";

@Injectable()
export class MybatisDemoDataOprService {
    private _currentDemoData: any = {};

    constructor(
        private apiService: ApiService
    ) {

    }

    public get currentDemoData(): any {
        return this._currentDemoData;
    }
    public set currentDemoData(value: any) {
        this._currentDemoData = value;
    }

    addData(data): Observable<any> {
        return this.apiService.pipeApi(this.apiService.postJSON('appbiz/mybatis/data/create', data));
    }

    updateData(data): Observable<any> {
        return this.apiService.pipeApi(this.apiService.postJSON('appbiz/mybatis/data/update', data));
    }

    getDataList(data): Observable<any> {
        return this.apiService.pipeApi(this.apiService.get('appbiz/mybatis/data/retrieve', data));
    }

    deleteData(data): Observable<any> {
        return this.apiService.pipeApi(this.apiService.postJSON('appbiz/mybatis/data/delete', data));
    }


}
