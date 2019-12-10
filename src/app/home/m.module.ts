import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from '../share.module';

import { MenuService } from './services/menu.service';
import { MasterDataService } from './services/master-data.service';
import { LayoutDefaultComponent } from './m/layout/default.component';
import { IndexComponent } from './index/index.component';
import { ResponsiveModule } from './responsive/responsive.module';

const COMPONENTS = [
    LayoutDefaultComponent
];

const homeRoutes: Routes = [
    {
        path: '', component: LayoutDefaultComponent,
        children: [
            { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: 'index', component: IndexComponent },
            { path: 'biz1', loadChildren: './m/biz1/biz1.module#Biz1Module' },
            { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
        ]
    }
];

@NgModule({
    imports: [
        AppSharedModule,
        ResponsiveModule,
        RouterModule.forChild(homeRoutes)
    ],
    providers: [
        MenuService,
        MasterDataService
    ],
    declarations: [
        ...COMPONENTS
    ]
})
export class MobileHomeModule { }
