import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HandlerService } from '../services/handler.service';
import { ApiService } from '../services/api.service';

@Injectable()
export class LoginGuard implements CanActivateChild {
    constructor(private authService: AuthService,
        private location: Location,
        private router: Router,
        public handlerService: HandlerService,
        public apiService: ApiService
    ) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.handlerService.closeAlert();
        if (this.authService.getLoginUser() === '') {
            this.apiService.callApi(this.apiService.get('appbiz/cfg/currentUser'),
            (res: any) => {
                if (res.data) {
                    this.authService.setLoginUser(res.data);
                } else {
                    this.authService.setTargetURL(this.location.path());
                    this.router.navigateByUrl('passport/login');
                }
            });
        }
        return true;
    }
}
