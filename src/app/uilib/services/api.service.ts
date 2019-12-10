import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpEventType, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serialize, transToFormData, transFgAndValuesToFormData } from '../util/util';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HandlerService } from './handler.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
    base_href = environment.base_href;
    csrfToken = '';
    csrfTokenUrl = 'appbiz/cfg/csrftoken';
    jsonHeaders: HttpHeaders;

    formHeaders: HttpHeaders;

    multipartformHeaders: HttpHeaders;


    constructor(
        private http: HttpClient,
        private router: Router,
        private authService: AuthService,
        public handlerService: HandlerService
    ) {
        this.jsonHeaders = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json');

        this.formHeaders = new HttpHeaders().set('Accept', 'application/json')
            .set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');

        this.multipartformHeaders = new HttpHeaders().set('Accept', 'application/json');
    }

    getFullHref(path: string): string {
        return this.base_href + path;
    }

    get(path: string, args?: any): Observable<any> {
        const options = this.getOptions(this.jsonHeaders);
        if (args) {
            options['params'] = serialize(args);
        }
        return this.http.get(this.base_href + path, options);
    }

    postJSON(path: string, jsonObject: any, customHeaders?: HttpHeaders): Observable<any> {
        const options = this.getOptions(this.jsonHeaders, customHeaders);
        return this.http.post(this.base_href + path, jsonObject, options);
    }

    postForm(path: string, body: any, isMultipart: boolean = false, customHeaders?: HttpHeaders): Observable<any> {
        if (isMultipart) {
            const options = this.getOptions(this.multipartformHeaders, customHeaders);
            if (body instanceof FormGroup) {
                body = transToFormData(body);
            }
            return this.http.post(this.base_href + path, body, options);
        } else {
            const options = this.getOptions(this.formHeaders, customHeaders);
            const params = serialize(body);
            return this.http.post(this.base_href + path, params, options);
        }
    }

    putJSON(path: string, jsonObject: any, customHeaders?: HttpHeaders): Observable<any> {
        const options = this.getOptions(this.jsonHeaders, customHeaders);
        return this.http.put(this.base_href + path, JSON.stringify(jsonObject), options);
    }

    putFormGroup(path: string, fg: FormGroup, customHeaders?: HttpHeaders): Observable<any> {
        const options = this.getOptions(this.multipartformHeaders, customHeaders);
        const formData = transToFormData(fg);

        return this.http.put(this.base_href + path, formData, options);
    }

    delete(path: string, args?: any): Observable<any> {
        const options = this.getOptions(this.jsonHeaders);
        if (args) {
            options['params'] = serialize(args);
        }

        return this.http.delete(this.base_href + path, options);
    }

    /**
     * the common method to call the api
     * @param api request path
     * @param success success method when request success
     * @param error error method when request failed
     */
    callApi(api: Observable<any>, success?: Function, error?: Function, isModal: boolean = false) {
        api.subscribe(
            (res: any) => {
                if (res && res.success) {
                    if (res.csrfToken) {
                        this.csrfToken = res.csrfToken;
                    }
                    if (success) { success(res); }
                } else {
                    this.handlerService.handleException(res.statusCode, res.exceptionId, res.msg, isModal);
                    if (error) { error(); }
                }
            }, (err) => {
                this.handlerService.handleException(err.error.statusCode, err.error.exceptionId, err.error.msg, isModal);
                if (error) { error(); }
            }
        );
    }
    pipeApi(api: Observable<any>, isModal: boolean = false): Observable<any> {
        return api.pipe(
            map((res: any) => {
                if (res && res.success && res.csrfToken) {
                    this.csrfToken = res.csrfToken;
                } else {
                    this.handlerService.handleException(res.statusCode, res.exceptionId, res.msg, isModal);
                }
                return res;
            }, (err) => {
                this.handlerService.handleException(err.error.statusCode, err.error.exceptionId, err.error.msg, isModal);
                return err;
            })
        );
    }
    // this is a method used for mock testint to request static json file
    getMock(path: string): Observable<any> {
        // return this.http.get(this.base_href + path).catch(this.checkError);
        return this.http.get(path);
    }

    private getOptions(hearder: HttpHeaders, customHeaders?: HttpHeaders) {

        const _headers = (customHeaders || hearder).set('X-CSRF-TOKEN', this.csrfToken);
        return {
            headers: _headers
        };
    }

    // Display error if logged in, otherwise redirect to IDP
    private checkError(error: any): any {
        console.log('error: ' + error);

        if (error && error.status === 401) {
            // this.redirectIfUnauth(error);
            console.log(error);
        } else {
            // this.displayError(error);
            console.log(error);
        }
        throw error;
    }

    getCsrfToken(success?: Function, error?: Function) {
        this.callApi(this.get(this.csrfTokenUrl), success, error);
    }

    setCsrfToken(_csrfToken: string) {
        this.csrfToken = _csrfToken;
    }

    doDownload(path: string, params?: any) {
        let fullPath = this.getFullHref(path);
        if (params) {
            const urlParams = serialize(params).toString();
            if (urlParams && urlParams !== '') {
                fullPath = fullPath + '?' + urlParams;
            }
        }
        window.open(fullPath, '_self');
    }

    doLogout() {
        this.authService.setTargetURL('');
        this.callApi(this.postForm('appbiz/dologout', null));
        this.authService.logOut();
        this.handlerService.closeAlert();
        this.router.navigateByUrl(
            'passport/login'
        );
    }
}
