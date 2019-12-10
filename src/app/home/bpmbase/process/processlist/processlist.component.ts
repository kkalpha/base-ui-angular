import { Component, OnInit } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../../uilib/services/api.service';

@Component({
  selector: 'app-processlist',
  templateUrl: './processlist.component.html',
  styleUrls: ['./processlist.component.less']
})
export class ProcesslistComponent implements OnInit {

  processCategory = 'All';
  data = [];

  constructor(
    private msg: NzMessageService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  handleSearch() {
    let category = '';

    const params = {
      pageIndex: 1,
      pageSize: 10
    };

    if ('All' !== this.processCategory) {
      category = this.processCategory;
      params['category'] = this.processCategory;
    }

    this.apiService.get('appbiz/process/list', params).subscribe((res) => {
      this.data = res.data;
      this.data.forEach(item => {
        item.diagramhref = this.apiService.getFullHref('appbiz/process/diagram/') + item.id;
        // item.diagramhref = this.apiService.getFullHref('appbiz/process/getresource') + '?procDefId=' + item.id + '&resType=image';
      });
      this.msg.success('Done.');
    }, (err) => {
      this.msg.error('search failed.');
    });

  }

}
