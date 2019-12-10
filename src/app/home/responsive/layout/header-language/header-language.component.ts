import { Component, OnInit } from '@angular/core';
import { NzI18nService, en_US, zh_CN, zh_TW } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { SettingService } from 'src/app/uilib/services/setting.service';
import { LocaleProviderService, en_US as m_en_US, zh_CN as m_zh_CN} from 'ng-zorro-antd-mobile';


@Component({
    selector: 'header-language',
    templateUrl: 'header-language.component.html',
    styleUrls: ['./header-language.component.less']
})

export class HeaderLanguageComponent implements OnInit {
    languageValue: string;

    constructor(
        private setting: SettingService,
        private translate: TranslateService,
        private nzI18nService: NzI18nService,
        private localeProviderService: LocaleProviderService
    ) { }

    ngOnInit() {
        this.languageValue = this.translate.currentLang;
    }

    changeLanguage() {
        this.setting.setLayout('lang', this.languageValue);
        this.translate.use(this.languageValue);
        if (this.languageValue === 'en') {
            this.nzI18nService.setLocale(en_US);
            this.localeProviderService.setLocale(m_en_US);
        } else if (this.languageValue === 'zh_CN') {
            this.nzI18nService.setLocale(zh_CN);
            this.localeProviderService.setLocale(m_zh_CN);
        } else if (this.languageValue === 'zh_TW') {
            this.nzI18nService.setLocale(zh_TW);
            this.localeProviderService.setLocale(m_zh_CN);
        }
    }
}
