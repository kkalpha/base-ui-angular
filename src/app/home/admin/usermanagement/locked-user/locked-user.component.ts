import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../../uilib/services/api.service';

@Component({
  selector: 'app-locked-user',
  templateUrl: './locked-user.component.html',
  styleUrls: ['./locked-user.component.less']
})
export class LockedUserComponent implements OnInit {

  lockedUsers = [];
  constructor(
    private msg: NzMessageService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }
  refresh() {
    this.apiService.get('appbiz/user/lockedusers'
    ).subscribe((res) => {
      this.lockedUsers = res.data;
      this.msg.success('Refresh Done.');
    }, (err) => {
      this.msg.error('Refresh failed.');
    });
  }
  unlock(data) {
    this.apiService.callApi(this.apiService.postForm('appbiz/user/unlock', data),
      (res: any) => {
        this.msg.success('Unlock Done.');
      },
      (err) => {
        this.msg.error('Unlock failed.');
      }
    );
  }
}
