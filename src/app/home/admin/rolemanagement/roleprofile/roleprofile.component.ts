import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../../uilib/services/api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RoleDataService } from '../roledata.service';

@Component({
    selector: 'app-roleprofile',
    templateUrl: './roleprofile.component.html',
    styleUrls: ['./roleprofile.component.less']
})
export class RoleprofileComponent implements OnInit {
    form: FormGroup;
    _saveOperating = false;
    action_result = {
        showmsg: false,
        msgType: 'success',
        msg: ''
    };

    roleData: any = {
        status: 'active'
    };
    @Output()
    roleProfileEvent = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private dataService: RoleDataService,
        private msg: NzMessageService,
        private apiService: ApiService
    ) { }


    ngOnInit() {
        this.form = this.fb.group({
            id: null,
            name: [null, [Validators.required]],
            category: [null, [Validators.required]],
            isActive: [true],
            remarks: [null, Validators.compose([Validators.required, Validators.max(255)])],
        });

    }
    initRoleProfile(data) {
        this.action_result.showmsg = false;
        if (data.action === 'new') {
            this.form.reset();
            this.roleData = {
                status: 'active'
            };
            this.form.controls['isActive'].setValue(true);
        } else {
            this.roleData = data;
            // use the editing role to init the form
            this.form.patchValue(data);
            if (data && data.status === 'inactive') {
                this.form.controls['isActive'].setValue(false);
            }
        }
    }
    getFormControl(name) {
        return this.form.controls[name];
    }

    _submitForm() {
        for (const i in this.form.controls) {
            if (this.form.controls.hasOwnProperty(i)) {
                this.form.controls[i].markAsDirty();
                this.form.controls[i].updateValueAndValidity();
            }
        }
        if (this.form.valid) {
            this.roleData.status = 'active';
            this.roleData.name = this.form.controls['name'].value;
            this.roleData.category = this.form.controls['category'].value;
            this.roleData.remarks = this.form.controls['remarks'].value;

            if (this.form.controls['isActive'].value === false) {
                this.roleData.status = 'inactive';
            }

            if (this.form.valid) {
                this.apiService.postJSON('appbiz/role/saveOrUpdateSysRole', this.roleData).subscribe((res) => {

                    if (res && res.success) {

                        this.setResult('success', res);
                        this.roleProfileEvent.emit(res.data);
                    } else {
                        this.setResult('error', res);
                    }
                    // ++this.stepItem.currentStep;
                }, (err) => {
                    this.msg.error('action failed.');
                });
            }

        }
    }

    setResult(msgType: string, res?: any) {
        this.action_result.showmsg = true;

        this.action_result.msgType = msgType;
        if (res && res.msg) {
            this.action_result.msg = res.msg;
        }

    }

}
