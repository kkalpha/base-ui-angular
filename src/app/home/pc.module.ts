import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from '../share.module';

import { LayoutDefaultComponent } from './pc/layout/default.component';
import { HeaderComponent } from './pc/layout/header/header.component';

import { IndexComponent } from './index/index.component';
import { HeaderMenuComponent } from './pc/layout/header-menu/header-menu.component';
import { MenuService } from './services/menu.service';
import { MasterDataService } from './services/master-data.service';
import { FileService } from './services/file.service';
import { ResponsiveModule } from './responsive/responsive.module';
import { TaskService } from './core/common/task.service';
import { WorkflowLogComponent } from '../uilib/components/workflow-log/workflow-log.component';
import { ReimburseWorkflowService } from './core/workflow/reimbursement-workflow.service';

const COMPONENTS = [
    LayoutDefaultComponent,
    HeaderComponent,
    HeaderMenuComponent
];

const homeRoutes: Routes = [
    {
        path: '', component: LayoutDefaultComponent,
        children: [
            { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: 'index', component: IndexComponent },
            { path: 'data', loadChildren: './pc/data/data.module#DataModule' },
            { path: 'mybatis/data', loadChildren: './pc/mybatis/mybatis.data.module#MybatisDataModule' },
            { path: 'taskcenter', loadChildren: './pc/taskcenter/task-center.module#TaskCenterModule' },
            { path: 'travel', loadChildren: './pc/travel/travel.module#TravelModule' },
            { path: 'reimbursement', loadChildren: './pc/reimbursement/reimbursement.module#ReimbursementModule' },
            { path: 'report', loadChildren: './pc/report/report.module#ReportModule' },
            { path: 'misc', loadChildren: './pc/misc/misc.module#MiscModule' },
            { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
            { path: 'process', loadChildren: './bpmbase/bpmbase.module#BPMModule' }
        ]
    },
];

@NgModule({
    imports: [
        AppSharedModule,
        ResponsiveModule,
        RouterModule.forChild(homeRoutes)
    ],
    providers: [
        MenuService,
        FileService,
        MasterDataService,
        TaskService,
        ReimburseWorkflowService
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ],
    entryComponents: [
        WorkflowLogComponent
    ]
})
export class PCHomeModule { }
