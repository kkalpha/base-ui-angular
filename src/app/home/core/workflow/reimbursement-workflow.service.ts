import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/uilib/services/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class ReimburseWorkflowService {
    private _currentRequest: any = {};

    constructor(
        private apiService: ApiService
    ) {

    }

    public get currentRequest(): any {
        return this._currentRequest;
    }
    public set currentRequest(value: any) {
        this._currentRequest = value;
    }

    addData(data): Observable<any> {
        return this.apiService.pipeApi(this.apiService.postJSON('appbiz/reimbursement/create', data));
    }
    getOverAllTasks(): Observable<any> {
        return this.apiService.pipeApi(this.apiService.get('appbiz/reimbursement/tasks'));
    }
    getTasks(data): Observable<any> {
        return this.apiService.pipeApi(this.apiService.get('appbiz/reimbursement/tasklist', data));
    }

    doProcess(data): Observable<any> {
        return this.apiService.pipeApi(this.apiService.postJSON('appbiz/reimbursement/process', data));
    }


}
