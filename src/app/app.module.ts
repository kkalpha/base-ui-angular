import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NotfoundComponent } from './passport/notfound/notfound.component';
import { HeaderInterceptor } from './uilib/interceptor/header.interceptor';
import { ResponseInterceptor } from './uilib/interceptor/response.interceptor';
import { ApiService } from './uilib/services/api.service';
import { LoginGuard } from './uilib/auth/login.guard';
import { AuthService } from './uilib/auth/auth.service';
import { HandlerService } from './uilib/services/handler.service';
import { SettingService } from './uilib/services/setting.service';
import { environment } from '../environments/environment';
import { I18nResourceService } from './home/services/i18n/i18n.resource.service';
import { I18nResourceLoader } from './home/services/i18n/i18n.resource.loader';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
// import { LOCAL_PROVIDER_TOKEN } from 'ng-zorro-antd-mobile';

export function createTranslateLoader(http: HttpClient) {
  // return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  return new TranslateHttpLoader(http, environment.base_href + 'appbiz/i18n/', '');
}

export function createTranslateLoader2(apiService: ApiService) {
  return new I18nResourceLoader(apiService);
}

registerLocaleData(zh);

const SERVICES = [
  LoginGuard,
  ApiService,
  AuthService,
  HandlerService,
  SettingService,
  I18nResourceService
];

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    NgZorroAntdMobileModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    })

    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: (createTranslateLoader2),
    //     deps: [ApiService]
    //   }
    // })
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    ...SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
