import { Component, OnInit } from '@angular/core';
import { UserStepTransferService } from '../usersteptransfer.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../../uilib/services/api.service';

@Component({
    selector: 'app-userrole',
    templateUrl: './userrole.component.html',
    styleUrls: ['./userrole.component.less']
})
export class UserroleComponent implements OnInit {

    action_result = {
        showmsg: false,
        msgType: 'success',
        msg: ''
    };

    userinfo = [];
    list: any[] = [];
    assignedRoles = [];


    constructor(
        public stepItem: UserStepTransferService,
        private msg: NzMessageService,
        private apiService: ApiService
    ) { }

    ngOnInit() {
        // make it as array
        this.userinfo = [this.stepItem.userData];
        this.stepItem.roleList.forEach(roleData => {

            this.list.push({
                key: roleData.id.toString(),
                title: roleData.name,
                direction: roleData.userInThisRole === 'Y' ? 'right' : ''
            });

            // add the existing roles to assigned roles
            if (roleData.userInThisRole === 'Y') {
                this.assignedRoles.push(roleData.id.toString());
            }

        });

    }

    select(ret: any) {
    }

    change(ret: any) {

        // add to assigned roles
        if (ret.from === 'left') {
            ret.list.forEach(item => {
                this.assignedRoles.push(item.key);
            });
        } else {// remove from assigned roles
            ret.list.forEach(item => {
                const val = item.key;
                const index = this.assignedRoles.indexOf(val);
                if (index > -1) {
                    this.assignedRoles.splice(index, 1);
                }
            });
        }

    }

    prev() {
        --this.stepItem.currentStep;
    }
    save() {
        const jsondata = {
            uid: this.stepItem.userData.id,
            assignedRoles: this.assignedRoles
        };
        this.apiService.postForm('appbiz/user/saveOrUpdateRolesForUser', jsondata).subscribe((res) => {

            this.setResult('success', res);
        }, (err) => {
            this.msg.error('action failed.');
        });

    }
    setResult(msgType: string, res?: any) {

        if ('success' === msgType) {
            // need to refresh role list after a success creation/editing
            this.stepItem.needRefreshRoleList = true;
        }
        this.action_result.showmsg = true;
        this.action_result.msgType = msgType;
        if (res && res.msg) {
            this.action_result.msg = res.msg;
        }

    }

    next() {
        this.stepItem.currentStep = 0;
    }
    showDetail(ret: any) {
        ret.preventDefault();
    }
}
