import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleDataService } from './roledata.service';
import { RoleprofileComponent } from './roleprofile/roleprofile.component';
import { RolepermissionComponent } from './rolepermission/rolepermission.component';


@Component({
  selector: 'app-rolemanagement',
  templateUrl: './rolemanagement.component.html',
  styleUrls: ['./rolemanagement.component.less'],
  providers: [RoleDataService]
})
export class RolemanagementComponent implements OnInit {

  currentTab = 0;
  currentRole = {};

  @ViewChild(RoleprofileComponent) roleProfile: RoleprofileComponent;

  @ViewChild(RolepermissionComponent) rolePermission: RolepermissionComponent;

  constructor(
    private dataService: RoleDataService
  ) { }

  ngOnInit() {
  }

  onRoleListEvent($event) {

    this.currentRole = $event;
    this.currentTab = 1;
    this.roleProfile.initRoleProfile($event);

  }

  onRoleProfileEvent($event) {

    this.currentRole = $event;
  }

  initRolePermission($event) {

    this.rolePermission.initRolePermissionData(this.currentRole);
  }

}
