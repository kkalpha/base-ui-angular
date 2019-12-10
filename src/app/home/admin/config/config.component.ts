import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../uilib/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.less']
})
export class ConfigComponent implements OnInit {
    result = {
        showmsg: false,
        msgType: 'success',
        msg: ''
    };
    isInAction = false;

    formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private msg: NzMessageService,
        private apiService: ApiService
    ) {
        this.formGroup = this.fb.group({
            configoption: [null, [Validators.required]]
        });
    }

    ngOnInit() {
    }
    doRefresh() {

        this.isInAction = true;
        this.result.showmsg = false;
        const param = {
            configoption: this.formGroup.controls.configoption.value
        };
        this.apiService.postForm('/appbiz/cfg/refresh', param).subscribe(

            (res: any) => {
                if (res && res.success) {
                    this.setResult('success', res);
                } else {
                    this.setResult('error', res);
                }

            }, (err) => {
                this.setResult('error', 'refresh config failed.');
            });

    }

    getSysEnv() {

        this.isInAction = true;
        this.result.showmsg = false;

        this.apiService.get('/appbiz/cfg/systemEnv').subscribe(
            (res: any) => {
                if (res && res.success) {
                    this.setResult('success', res);
                } else {
                    this.setResult('error', res);
                }

            }, (err) => {
                this.setResult('error', 'get system env failed.');
            }
        );
    }
    testTimeout() {

        this.isInAction = true;
        this.result.showmsg = false;

        this.apiService.get('/appbiz/cfg/testTimeout').subscribe(
            (res: any) => {
                if (res && res.success) {
                    this.setResult('success', res);
                } else {
                    this.setResult('error', res);
                }
            }, (err) => {
                this.setResult('error', 'test time out failed.');
            }
        );
    }

    setResult(msgType: string, res?: any) {
        this.isInAction = false;
        this.result.showmsg = true;

        this.result.msgType = msgType;
        if (res) {
            this.result.msg = res.msg;
        }

    }

}
