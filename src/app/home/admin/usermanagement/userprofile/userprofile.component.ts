import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../../uilib/services/api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserStepTransferService } from '../usersteptransfer.service';

@Component({
    selector: 'app-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.less']
})
export class UserprofileComponent implements OnInit {

    form: FormGroup;
    action_result = {
        showmsg: false,
        msgType: 'success',
        msg: ''
    };
    userData: any = {};
    constructor(
        private fb: FormBuilder,
        public stepItem: UserStepTransferService,
        private msg: NzMessageService,
        private apiService: ApiService
    ) { }

    updateConfirmValidator() {
        /** wait for refresh value */
        setTimeout(_ => {
            this.form.controls['checkPassword'].updateValueAndValidity();
        });
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.form.controls['password'].value) {
            return { confirm: true, error: true };
        }
    }

    ngOnInit() {
        this.form = this.fb.group({
            id: null,
            loginId: [null, [Validators.required]],
            name: [null, [Validators.required]],
            email: [null, Validators.compose([Validators.required, Validators.email])],
            type: [null, [Validators.required]],
            password: [null, [Validators.required]],
            checkPassword: [null, [Validators.required, this.confirmationValidator]],
            isActive: [true],
            remarks: [null, Validators.compose([Validators.required, Validators.max(255)])],
        });

        if (this.stepItem.userData.action === 'new') {
            this.userData = {
                status: 'active'
            };
            this.form.reset();
        } else {
            this.userData = this.stepItem.userData;
            this.form.patchValue(this.stepItem.userData);

            if (this.stepItem.userData && this.stepItem.userData.userStatus === 'inactive') {
                this.form.controls['isActive'].setValue(false);
            }
            this.form.controls['checkPassword'].setValue(this.form.controls['password'].value);
        }


    }

    getFormControl(name) {
        return this.form.controls[name];
    }

    _submitForm() {
        // set a dummy value for code1 user which not needs input password to pass form validation
        if (this.form.controls['type'].value === 'code1') {
            this.form.controls['password'].setValue('dumy');
            this.form.controls['checkPassword'].setValue('dumy');
            this.userData.password = 'dumy';
        }
        for (const i in this.form.controls) {
            if (this.form.controls.hasOwnProperty(i)) {
                this.form.controls[i].markAsDirty();
                this.form.controls[i].updateValueAndValidity();
            }
        }

        if (this.form.valid) {
            // this.userData.status = 'active';
            this.userData.loginId = this.form.controls['loginId'].value;
            this.userData.name = this.form.controls['name'].value;
            this.userData.email = this.form.controls['email'].value;
            this.userData.type = this.form.controls['type'].value;
            this.userData.remarks = this.form.controls['remarks'].value;


            if (this.form.controls['isActive'].value === false) {
                this.userData.status = 'inactive';
            }


            this.apiService.postJSON('appbiz/user/saveOrUpdateSysUser', this.userData).subscribe((res) => {

                if (res && res.success) {

                    this.setResult('success', res);
                } else {
                    this.setResult('error', res);
                }
                // ++this.stepItem.currentStep;
            }, (err) => {
                this.msg.error('action failed.');
            });
        }


    }

    prev() {
        --this.stepItem.currentStep;
    }
    next() {

        const uid = this.stepItem.userData.id;

        this.apiService.get(`appbiz/role/roleListByUid/{uid}`).subscribe((res) => {

            this.stepItem.roleList = res.data;

            ++this.stepItem.currentStep;
        }, (err) => {
            this.msg.error('action failed.');
        });


    }

    setResult(msgType: string, res?: any) {

        if ('success' === msgType) {
            // need to refresh user list after a success creation/editing
            this.stepItem.needRefreshUserList = true;

            // set the current user data as the created/updated data
            this.stepItem.userData = res.data;
        }
        this.action_result.showmsg = true;

        this.action_result.msgType = msgType;
        if (res && res.msg) {
            this.action_result.msg = res.msg;
        }

    }


}
