import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {
    public TARGET_URL = 'TARGET_URL';

    public LOGIN_USER = 'LOGIN_USER';

    public LOGIN_PASSWORD = 'LOGIN_PASSWORD';

    getTargetURL(): string {
        return sessionStorage.getItem(this.TARGET_URL) || '';
    }
    setTargetURL(targetURL: string) {
        sessionStorage.setItem(this.TARGET_URL, targetURL);
    }

    getLoginUser(): string {
        return sessionStorage.getItem(this.LOGIN_USER) || '';
    }
    setLoginUser(loginUser: string) {
        sessionStorage.setItem(this.LOGIN_USER, loginUser);
    }

    logOut() {
        sessionStorage.removeItem(this.LOGIN_USER);
    }

    setRememberUser(userName: string, password: string) {
        localStorage.setItem(this.LOGIN_USER, userName);
        localStorage.setItem(this.LOGIN_PASSWORD, password);
    }

    getRememberUser() {
        return {
            userName: localStorage.getItem(this.LOGIN_USER),
            password: localStorage.getItem(this.LOGIN_PASSWORD)
        };
    }

    removeRememberUser() {
        localStorage.removeItem(this.LOGIN_USER);
        localStorage.removeItem(this.LOGIN_PASSWORD);
    }

}
