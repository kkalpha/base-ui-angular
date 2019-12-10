import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../../uilib/services/api.service';
import { getElementsInArr1NotInArr2 } from '../../../../uilib/util/Arrayutil';

@Component({
    selector: 'app-rolepermission',
    templateUrl: './rolepermission.component.html',
    styleUrls: ['./rolepermission.component.less']
})
export class RolepermissionComponent implements OnInit {

    _allChecked = false;
    _disabledButton = true;
    _checkedNumber = 0;
    _operating = false;
    _indeterminate = false;

    roleData: Array<any> = [];
    // roleName = '';
    roleID = '';
    totalCount = 0;
    menuList = [];
    originalMenuList = [];
    selectedMenuList = [];

    @Output()
    roleProfiletEvent = new EventEmitter();

    action_result = {
        showmsg: false,
        msgType: 'success',
        msg: ''
    };


    constructor(
        private msg: NzMessageService,
        private apiService: ApiService,
    ) { }

    ngOnInit() {

    }
    initRolePermissionData(data) {
        this.action_result.showmsg = false;
        if (data.id === undefined || data.id === '') {
            // when active thsi tab with no roel is created or selected for editing
            this.roleData = [];
            this.menuList = [];
            return;
        }
        // when editing a role or after a new role created
        this.roleData = [data];
        this.roleID = data.id;

        this.doSearch();
    }

    doSearch() {

        const param = {
            rid: this.roleID
        };
        this.apiService.get(`appbiz/menu/byRoleID/${this.roleID}`
        ).subscribe((res) => {

            this.menuList = res.data;
            this.totalCount = res.total;

            // save the original menu id the role can acess
            this.originalMenuList = [];
            if (res.data) {
                res.data.forEach(element => {
                    if (element.checked) {
                        this.originalMenuList.push(element.mid);
                    }
                });
            }

            this.msg.success('Done.');


        }, (err) => {
            this.msg.error('search failed.');
        });

    }

    _displayDataChange($event) {
        // this.selectedMenuList = $event;
        // console.log(this.selectedMenuList);
    }

    _refreshStatus() {

        const allChecked = this.menuList.every(value => value.checked === true);
        const allUnChecked = this.menuList.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);

        this._disabledButton = !this.menuList.some(value => value.checked);
        this._checkedNumber = this.menuList.filter(value => value.checked).length;

    }

    _checkAll(value) {

        if (value) {
            this.menuList.forEach(data => data.checked = true);
        } else {
            this.menuList.forEach(data => data.checked = false);
        }
        this._refreshStatus();
    }

    _saveRolePermission() {
        this._operating = true;
        this.action_result.showmsg = false;

        this.selectedMenuList = [];
        this.menuList.forEach(element => {
            if (element.checked) {
                this.selectedMenuList.push(element.mid);
            }
        });

        // menu in the selected list but not in the original list needs to be added
        const insertMenus = getElementsInArr1NotInArr2(this.selectedMenuList, this.originalMenuList);
        // menu in the original list but not in the selected list needs to be deleted
        const deleteMenus = getElementsInArr1NotInArr2(this.originalMenuList, this.selectedMenuList);

        if (insertMenus.length > 0 || deleteMenus.length > 0) {
            this.postData(insertMenus, deleteMenus);
        } else {
            this._operating = false;
        }

    }

    postData(insertMenus: number[], deleteMenus: number[]) {

        const param = {
            rid: this.roleID,
            insertMenus: insertMenus,
            deleteMenus: deleteMenus
        };

        this.apiService.postForm('appbiz/role/saveOrUpdateRolePermission', param).subscribe((res) => {

            if (res && res.success) {

                this.setResult('success', res);
            } else {
                this.setResult('error', res);
            }
            // ++this.stepItem.currentStep;
        }, (err) => {
            this.setResult('error', { msg: 'action failed.' });
        });

    }

    setResult(msgType: string, res?: any) {
        this._operating = false;
        if ('success' === msgType) {
            // set the original list again to avoid user might click save again
            // after a successfull post
            this.menuList.forEach(element => {
                if (element.checked) {
                    this.originalMenuList.push(element.mid);
                }
            });

        }
        this.action_result.showmsg = true;

        this.action_result.msgType = msgType;
        if (res && res.msg) {
            this.action_result.msg = res.msg;
        }

    }

}
