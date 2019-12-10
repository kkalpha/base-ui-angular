import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingService } from './uilib/services/setting.service';
import { NzI18nService, en_US, zh_CN, zh_TW } from 'ng-zorro-antd';
import { LocaleProviderService, en_US as m_en_US, zh_CN as m_zh_CN} from 'ng-zorro-antd-mobile';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    constructor(
        private setting: SettingService,
        private translate: TranslateService,
        private nzI18nService: NzI18nService,
        private localeProviderService: LocaleProviderService
    ) {
        if (this.setting.layout.lang) {
            translate.use(this.setting.layout.lang);
            if (this.setting.layout.lang === 'zh_CN') {
                this.nzI18nService.setLocale(zh_CN);
                this.localeProviderService.setLocale(m_zh_CN);
            } else if (this.setting.layout.lang === 'zh_TW') {
                this.nzI18nService.setLocale(zh_TW);
                this.localeProviderService.setLocale(m_zh_CN);
            } else {
                this.nzI18nService.setLocale(en_US);
                this.localeProviderService.setLocale(m_en_US);
            }
        } else {
            const browserLang = translate.getBrowserLang();
            translate.use(browserLang.match(/en|zh/) ? browserLang : 'en');
            if (this.setting.layout.lang === 'zh_CN') {
                this.nzI18nService.setLocale(zh_CN);
                this.localeProviderService.setLocale(m_zh_CN);
            } else if (this.setting.layout.lang === 'zh_TW') {
                this.nzI18nService.setLocale(zh_TW);
                this.localeProviderService.setLocale(m_zh_CN);
            } else {
                this.nzI18nService.setLocale(en_US);
                this.localeProviderService.setLocale(m_en_US);
            }
        }
    }
}
