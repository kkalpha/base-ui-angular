import { Component, OnInit, ViewChild } from '@angular/core';
import { UserStepTransferService } from './usersteptransfer.service';
import { NzMessageService } from 'ng-zorro-antd';
import { LockedUserComponent } from './locked-user/locked-user.component';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.less'],
  providers: [UserStepTransferService]
})
export class UsermanagementComponent implements OnInit {
  currentTab = 0;
  @ViewChild(LockedUserComponent) lockedUserComponent: LockedUserComponent;
  constructor(
    public stepItem: UserStepTransferService
  ) { }

  ngOnInit() {
  }
  initLockedUserComponent() {
    this.lockedUserComponent.refresh();
  }
}
