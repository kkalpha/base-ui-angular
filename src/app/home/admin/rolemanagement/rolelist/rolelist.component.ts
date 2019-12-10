import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../../uilib/services/api.service';
import { HandlerService } from 'src/app/uilib/services/handler.service';

@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.less']
})
export class RolelistComponent implements OnInit {

  tableInfo = {
    total: 0,
    pageIndex: 1,
    pageSize: 8,
    isEmptyTableVisible: false,
    showSizeChanger: true,
    loading: false,
    data: []
  };

  roleName = '';
  _searchOperating = false;

  @Output()
  roleListEvent = new EventEmitter();

  constructor(
    private msg: NzMessageService,
    private apiService: ApiService,
    public handlerService: HandlerService
  ) { }

  ngOnInit() {
    this.doSearch();
  }

  refreshTable(val, eventType) {
    if (eventType === 'index') {
      this.tableInfo.pageIndex = val;
    } else {
      this.tableInfo.pageSize = val;
      this.tableInfo.pageIndex = 1;
    }
    this.doSearch();
  }
  doSearch() {
    this._searchOperating = true;
    const params = {
      pageIndex: this.tableInfo.pageIndex,
      pageSize: this.tableInfo.pageSize,
      name: this.roleName
    };

    this.apiService.callApi(this.apiService.get('appbiz/role/roleList', params), (res: any) => {
      this.tableInfo.loading = false;
      this.tableInfo.total = res.total;
      this.tableInfo.data = res.data;
      this._searchOperating = false;
    }, (err) => {
      this._searchOperating = false;
    });
  }
  doEdit(data) {
    this.roleListEvent.emit(data);
  }
  doCreation() {
    this.roleListEvent.emit({ action: 'new' });
  }

}
