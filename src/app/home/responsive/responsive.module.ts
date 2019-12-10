import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from '../index/index.component';
import { AppSharedModule } from 'src/app/share.module';
import { HeaderUserComponent } from './layout/header-user/header-user.component';
import { HeaderLanguageComponent } from './layout/header-language/header-language.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';


const COMPONENTS = [
    HeaderUserComponent,
    HeaderLanguageComponent,
    SidebarComponent,
    IndexComponent
];



@NgModule({
    imports: [
        AppSharedModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class ResponsiveModule { }
