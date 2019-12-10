import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from '../share.module';

import { UserLoginComponent } from './login/login.component';
import { PassportComponent } from './passport.component';

const homeRoutes: Routes = [
    {
        path: '', component: PassportComponent,
        children: [
            { path: 'login', component: UserLoginComponent }
        ]
    }
];

const COMPONENTS = [
    UserLoginComponent,
    PassportComponent
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes),
        AppSharedModule
    ],
    providers: [],
    declarations: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS
    ]
})
export class AppPassportModule { }
