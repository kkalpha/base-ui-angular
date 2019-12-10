import { Injectable } from '@angular/core';
import { TableInfo } from 'src/app/uilib/components/list-table/list-table';

@Injectable()
export class UserStepTransferService {

    currentStep = 0;
    needRefreshUserList = false;
    userListInfo: TableInfo;
    userData: any = {}; // the user is created or updated

    needRefreshRoleList = false;
    roleList = undefined;

    // again() {
    //     this.step = 0;
    //     this.pay_account = 'ant-design@alipay.com';
    //     this.receiver_type = 'alipay';
    //     this.receiver_account = 'test@example.com';
    //     this.receiver_name = 'asdf';
    //     this.amount = 500;
    // }

    constructor() {
        //this.again();
    }
}
