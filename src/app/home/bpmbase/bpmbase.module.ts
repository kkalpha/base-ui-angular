import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppSharedModule } from '../../share.module';
import { MetaDataComponent } from './process/meta-data.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ProcessDepComponent } from './process/processdep/processdep.component';
import { ProcesslistComponent } from './process/processlist/processlist.component';
import { ProcessinstancesComponent } from './process/processinstances/processinstances.component';


const bpmRoutes: Routes = [

  { path: 'meta', component: MetaDataComponent }

];


@NgModule({
  imports: [
    AppSharedModule,
    NgZorroAntdModule,
    RouterModule.forChild(bpmRoutes)
  ],
  declarations: [
    MetaDataComponent,
    ProcessDepComponent,
    ProcesslistComponent,
    ProcessinstancesComponent
  ]
})
export class BPMModule { }
