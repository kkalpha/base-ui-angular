import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/uilib/services/api.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.less']
})
export class FileUploadComponent implements OnInit {

  requestFiles = [];
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }


  beforeUpload = (file: any): boolean => {

        if (this.requestFiles.length > 0) {
            this.removeAttachment(this.requestFiles[0]);
            this.requestFiles.pop();
        }
        this.requestFiles = [...this.requestFiles, file];
    return false;
}

removeAttachment = (file: any): boolean => {
  this.requestFiles.pop();
    return true;
}

  upload() {
    const formData = new FormData();

    this.requestFiles.forEach((file: any) => {
        formData.append('files', file);
    });
    const api = `appbiz/file2/demo/1000`;
    this.apiService.callApi(this.apiService.postForm(api, formData, true),
        (res) => {
            if (res && res.success) {
                // this.deleteRemovedFiles();
            }
        }, null, true);
}

}
