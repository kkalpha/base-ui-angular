import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../uilib/services/api.service';
import { AuthService } from '../../uilib/auth/auth.service';
import { HandlerService } from '../../uilib/services/handler.service';
import { checkFormValid } from '../../uilib/util/util';
import { SettingService } from '../../uilib/services/setting.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class UserLoginComponent implements OnInit {

    form: FormGroup;
    isProcessing = false;
    emailId = '';

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private apiService: ApiService,
        public handlerService: HandlerService,
        private setting: SettingService) { }

    ngOnInit() {
        this.form = this.fb.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [true]
        });
        const user = this.authService.getRememberUser();
        this.userName.setValue(user.userName);
        this.password.setValue(user.password);
    }

    // region: fields

    get userName() { return this.form.controls['userName']; }
    get password() { return this.form.controls['password']; }

    // endregion

    login(isMobile = false) {
        this.handlerService.closeAlert();
        if (!checkFormValid(this.form)) {
            return;
        }

        this.isProcessing = true;
        const emaiStr: string = this.userName.value;
        const atPosition = emaiStr.indexOf('@');
        if (atPosition > 0) {
            // user inputd full email with @
            // this.emailId = emaiStr.substring(0, atPosition).trim();
            this.emailId = emaiStr.trim();
        } else {
            this.emailId = emaiStr.trim() + '@1.com';
        }

        const params = {
            userName: this.emailId,
            password: this.password.value
        };

        // get the csrf token
        this.apiService.getCsrfToken(
            (data: any) => {
                this.apiService.callApi(this.apiService.postForm('appbiz/dologin', params),
                    (res: any) => {
                        this.authService.setLoginUser(this.emailId);
                        this.keepClientInfo(isMobile ? 'm' : 'pc');
                        const targetUrl = this.authService.getTargetURL();
                        if (targetUrl === '' || targetUrl === '/passport/login') {
                            if (isMobile) {
                                this.router.navigate(['m']);
                                this.setting.setLayout('deviceType', 'm');
                            } else {
                                this.setting.setLayout('deviceType', 'pc');
                                this.router.navigate(['pc']);
                            }
                        } else {
                            this.router.navigate([targetUrl]);
                        }
                        if (this.form.controls['remember'].value) {
                            this.authService.setRememberUser(this.emailId, this.password.value);
                        } else {
                            this.authService.removeRememberUser();
                        }
                        this.isProcessing = false;
                    }, () => {
                        this.isProcessing = false;
                    }
                );
            }, (error) => {
                this.isProcessing = false;
                this.handlerService.handleException(503, 'exception', 'service unavailable');
            }
        );
    }

    keepClientInfo(dvsType: string) {
        const params = {
            what: 'logon',
            deviceType: dvsType,
            userAgent: 'unknown',
            misc: ''
        };
        if (window && window.navigator) {

            const nav = window.navigator;

            params.userAgent = nav.userAgent;

            if (nav.product) {
                params.misc = params.misc + ' /' + nav.product;
            }

            if (nav.platform) {
                params.misc = params.misc + ' /' + nav.platform;
            }

            if (nav.maxTouchPoints) {
                params.misc = params.misc + ' /' + nav.maxTouchPoints;
            }

            if (nav.hardwareConcurrency) {
                params.misc = params.misc + ' /' + nav.hardwareConcurrency;
            }

            if (nav.vendor) {
                params.misc = params.misc + ' /' + nav.vendor;
            }
        }

        this.apiService.callApi(this.apiService.postJSON('appbiz/clientinfo', params),
            (res) => {
                // do nothing
            });
    }
}
