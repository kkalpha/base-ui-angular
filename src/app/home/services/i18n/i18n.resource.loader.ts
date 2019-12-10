import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
// import { I18nResourceService } from './i18n.resource.service';
import { ApiService } from '../../../uilib/services/api.service';
import { map } from 'rxjs/operators';

export class I18nResourceLoader implements TranslateLoader {
    public lan_zh_tw = { HomeTitle: 'etravel', RememberMe: 'Remember Me' };

    resourceLoadDone = false;

    constructor(private apiService: ApiService) { }

    getTranslation(lang: string): Observable<any> {

        this.resourceLoadDone = false;
        //TODO find a way to decide if use local cache or get it from backend server
        return this.apiService.get('appbiz/i18n/' + lang);

        // return this.apiService.get('appbiz/i18n/' + lang).pipe(
        //     map(val => {
        //         this.resourceLoadDone = true;
        //         console.log(val);
        //     })
        // );

        // return Observable.create(function (observer) {
        //     //observer.onNext(this.I18nResourceService.lan_zh_tw);
        //     observer.next(this.lan_zh_tw);
        //     observer.complete();
        // }
        // );
    }
}
