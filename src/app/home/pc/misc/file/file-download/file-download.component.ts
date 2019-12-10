import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/uilib/services/api.service';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.less']
})
export class FileDownloadComponent implements OnInit {

  tableData = [];
  loading = false;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  downloadFile(id: any) {
    if (id) {
      window.open(this.apiService.getFullHref(`appbiz/file2/${id}`));
    }
  }
  getFileList() {

    this.apiService.callApi(this.apiService.get(`appbiz/file2/demo/1000`),
      (res: any) => {
        if (res.data) {
          this.tableData = res.data;
        }
      }, null, true);
  }


}
