import { Component, OnInit } from '@angular/core';
import { TableInfo, setTableData } from 'src/app/uilib/components/list-table/list-table';
import { formateDateText } from 'src/app/uilib/util/util';
import { Router } from '@angular/router';
import { MybatisDemoDataOprService } from 'src/app/home/core/data/mybatis-demo-data-opr.service';
import { HandlerService } from 'src/app/uilib/services/handler.service';

@Component({
  selector: 'mybatis-app-retrieve',
  templateUrl: './data-retrieve.component.html',
  styleUrls: ['./data-retrieve.component.less']
})
export class MybatisDataRetrieveComponent implements OnInit {

  transportationArray = ['Flight', 'Train', 'Bus', 'Private Car', 'All'];
  transportationSelected = 'All';

  tableInfo: TableInfo = {
    total: 0,
    pageIndex: 1,
    pageSize: 8,
    isEmptyTableVisible: false,
    showSizeChanger: true,
    loading: false,
    dataColumns: [
      { key: 'empId', headLabel: 'empId' },
      { key: 'departureDate', headLabel: 'departureDate', formatContent: formateDateText },
      { key: 'returnDate', headLabel: 'returnDate', formatContent: formateDateText },
      { key: 'transportation', headLabel: 'transpor tation' },
      { key: 'tripReason', headLabel: 'tripReason', formatContent: formateDateText },
      { key: 'createTime', headLabel: 'createTime', formatContent: formateDateText }
    ]
  };

  constructor(
    private router: Router,
    private demoDataOprService: MybatisDemoDataOprService,
    public handlerService: HandlerService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {

    this.tableInfo.buttonColumn = {
      headLabel: 'Action',
      buttons: [
        { label: 'Update', event: this.updateData, isVisible: () => true }
      ]
    };
    this.getDataList();
  }

  getDataList() {
    this.tableInfo.loading = true;

    const params = {
      pageIndex: this.tableInfo.pageIndex,
      pageSize: this.tableInfo.pageSize
    };

    if (this.transportationSelected !== 'All') {
      params['transportation'] = this.transportationSelected;
    }

    this.demoDataOprService.getDataList(params).subscribe((res) => {
      setTableData(this.tableInfo, res);
    }, (err) => {
      this.tableInfo.loading = false;
    }
    );
  }
  filterTable() {
    this.tableInfo.pageIndex = 1;
    this.getDataList();
  }

  refreshTable(pageParams: any) {
    if (pageParams.type === 'index') {
      this.tableInfo.pageIndex = pageParams.value;
    } else {
      this.tableInfo.pageSize = pageParams.value;
      this.tableInfo.pageIndex = 1;
    }
    this.getDataList();
  }

  updateData = (data: any) => {
    // TODO is there a better way to share data accross components?
    this.demoDataOprService.currentDemoData = data;
    this.router.navigate(['/pc/mybatis/data/update'], { queryParams: data });
  }

}

