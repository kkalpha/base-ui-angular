import { Component, OnInit } from '@angular/core';
import { TableInfo, setTableData } from 'src/app/uilib/components/list-table/list-table';
import { formateDateText } from 'src/app/uilib/util/util';
import { Router } from '@angular/router';
import { DemoDataOprService } from 'src/app/home/core/data/demo-data-opr.service';
import { HandlerService } from 'src/app/uilib/services/handler.service';

@Component({
  selector: 'app-retrieve',
  templateUrl: './data-retrieve.component.html',
  styleUrls: ['./data-retrieve.component.less']
})
export class DataRetrieveComponent implements OnInit {

  transportationArray = ['Flight', 'Train', 'Bus', 'Private Car', 'All'];
  transportationSelected = 'All';

  tableInfo: TableInfo = {
    total: 0,
    pageIndex: 1,
    pageSize: 5,
    isEmptyTableVisible: false,
    showSizeChanger: true,
    loading: false
  };
  formateDate = formateDateText;

  constructor(
    private router: Router,
    private demoDataOprService: DemoDataOprService,
    public handlerService: HandlerService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
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
      this.tableInfo.loading = false;
      this.tableInfo.total = res.total;
      this.tableInfo.data = res.data;
    }, (err) => {
      this.tableInfo.loading = false;
    }
    );
  }
  filterTable() {
    this.tableInfo.pageIndex = 1;
    this.getDataList();
  }

  changeTableSize(size: any) {
      this.tableInfo.pageSize = size;
      this.tableInfo.pageIndex = 1;
    this.getDataList();
  }

  indexTable(index: any) {
      this.tableInfo.pageIndex = index;
    this.getDataList();
  }

  updateData = (data: any) => {
    // TODO is there a better way to share data accross components?
    this.demoDataOprService.currentDemoData = data;
    this.router.navigate(['/pc/data/update'], { queryParams: data });
  }

}

