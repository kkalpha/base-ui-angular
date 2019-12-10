import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from './uilib/components/alert/alert.component';
import { WorkflowLogComponent } from './uilib/components/workflow-log/workflow-log.component';
import { ViewAttachmentsComponent } from './uilib/components/view-attachments/view-attachments.component';
import { ListTableComponent } from './uilib/components/list-table/list-table.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { DynamicComComponent } from './uilib/components/dynamic-template/dynamic-template.component';
import { TipComponent } from './uilib/components/tip/tip-template.component';

const COMPONENTS = [
    AlertComponent,
    WorkflowLogComponent,
    ViewAttachmentsComponent,
    ListTableComponent,
    DynamicComComponent,
    TipComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgZorroAntdModule,
        NgZorroAntdMobileModule,
        TranslateModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    entryComponents: [
        DynamicComComponent,
        TipComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgZorroAntdModule,
        NgZorroAntdMobileModule,
        TranslateModule,
        ...COMPONENTS
    ]
})
export class AppSharedModule { }
