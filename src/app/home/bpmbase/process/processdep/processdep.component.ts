import { Component, OnInit } from '@angular/core';

import { UploadFile, NzMessageService } from 'ng-zorro-antd';

import { ApiService } from '../../../../uilib/services/api.service';

@Component({
  selector: 'app-processdep',
  templateUrl: './processdep.component.html',
  styleUrls: ['./processdep.component.less']
})
export class ProcessDepComponent implements OnInit {

  result = {
    showmsg: false,
    msgType: 'success',
    msg: ''
  };

  processCategory = 'HR';
  processFile: any;
  fileList: UploadFile[] = [];
  isuploading = false;
  constructor(
    private msg: NzMessageService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }


  beforeUpload = (file: UploadFile): boolean => {
    this.fileList[0] = file;
    this.processFile = file;
    return false;
  }

  handleUpload() {

    this.isuploading = true;
    this.result.showmsg = false;

    if (this.processFile == null || this.processFile == undefined) {
      this.setResult('error', 'please select a process file.');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.processFile);
    formData.append('category', this.processCategory);

    this.apiService.postForm('appbiz/process/deploy', formData, true).subscribe(
      (res: any) => {
        if (res && res.success) {
          this.setResult('success', res.msg);
        } else {
          this.setResult('error', res.msg);
        }

      }, (err) => {
        this.setResult('error', 'upload failed.');
      });

  }
  setResult(msgType: string, msg?: string) {
    this.isuploading = false;
    this.result.showmsg = true;

    this.result.msgType = msgType;
    if (msg) {
      this.result.msg = msg;
    }

  }

  resetData() {
    this.isuploading = false;
    this.result.showmsg = false;
    this.fileList = [];
    this.processFile = null;
  }

  removeFile = (file: UploadFile): boolean => {
    this.processFile = null;
    return true;
  }

}
