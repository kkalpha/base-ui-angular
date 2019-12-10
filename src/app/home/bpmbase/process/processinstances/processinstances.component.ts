import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../../uilib/services/api.service';

@Component({
  selector: 'app-processinstances',
  templateUrl: './processinstances.component.html',
  styleUrls: ['./processinstances.component.less']
})

export class ProcessinstancesComponent implements OnInit {

  processCategory = '';
  data = [];

  constructor(
    private msg: NzMessageService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  handleSearch() {
    const params = {
      pageIndex: 1,
      pageSize: 10
    };

    if ('All' !== this.processCategory) {
      params['category'] = this.processCategory;
    }
    this.apiService.get('appbiz/process/runninglist', params).subscribe((res) => {
      this.data = res.data;
      this.data.forEach(item => {
        item.diagramhref = this.apiService.getFullHref('appbiz/process/instance/diagram/') + item.instanceId;
        item.simplediagramhref = this.apiService.getFullHref('appbiz/process/instance/simplediagram/') + item.instanceId;
      });
      this.msg.success('Done.');
    }, (err) => {
      this.msg.error('search failed.');
    });

  }

}
