import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../../uilib/services/api.service';
import { UserStepTransferService } from '../usersteptransfer.service';
import { TableInfo } from '../../../../uilib/components/list-table/list-table';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.less']
})
export class UserlistComponent implements OnInit {
  loginid = '';
  username = '';
  email = '';

  _searchOperating = false;

  tableInfo: TableInfo = {
    total: 0,
    pageIndex: 1,
    pageSize: 8,
    isEmptyTableVisible: false,
    showSizeChanger: true,
    loading: false,
    dataColumns: [
      { key: 'loginId', headLabel: 'login Id' },
      { key: 'userName', headLabel: 'Display name' },
      { key: 'email', headLabel: 'Email' },
      { key: 'type', headLabel: 'Type' },
      { key: 'userStatus', headLabel: 'Status' },
      { key: 'remarks', headLabel: 'Remarks' }
    ]
  };

  constructor(
    private msg: NzMessageService,
    private apiService: ApiService,
    public stepItem: UserStepTransferService
  ) { }

  ngOnInit() {
    this.tableInfo.buttonColumn = {
      headLabel: 'Management',
      buttons: [
        { label: 'Edit', event: this.edit, isVisible: () => true }
      ]
    };
    // this.tableInfo will be init each time ngOnInit is called
    // this.stepItem service will always have the data when back and force the steps
    this.tableInfo = this.stepItem.userListInfo || this.tableInfo;

    if (this.stepItem.needRefreshUserList) {
      this.searchUsers();
      // set needRefreshUserList to false after refreshed the user list data
      this.stepItem.needRefreshUserList = false;
    }

  }
  searchUsers() {

    const params = {
      pageIndex: this.tableInfo.pageIndex,
      pageSize: this.tableInfo.pageSize,
      loginId: this.loginid,
      name: this.username,
      email: this.email
    };
    this.apiService.callApi(this.apiService.get('appbiz/user/listUsers', params), (res: any) => {
      this.tableInfo.loading = false;
      this.tableInfo.total = res.total;
      this.tableInfo.data = res.data;

      this.stepItem.userListInfo = this.tableInfo;

      this._searchOperating = false;
    }, (err) => {
      this._searchOperating = false;
    });

  }

  refreshTable(pageParams: any) {
    if (pageParams.type === 'index') {
        this.tableInfo.pageIndex = pageParams.value;
    } else {
        this.tableInfo.pageSize = pageParams.value;
        this.tableInfo.pageIndex = 1;
    }
    this.searchUsers();
}

  edit = (data) => {
    this.stepItem.userData = data;
    this.stepItem.currentStep = 1;
  }
  newUser() {
    this.stepItem.userData = { action: 'new' };
    this.stepItem.currentStep = 1;
  }

}
