import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from 'src/app/share.module';
import { MybatisDemoDataOprService } from '../../core/data/mybatis-demo-data-opr.service';
import { MybatisDataFormComponent } from './data-form/data-form.component';
import { MybatisDataCreateComponent } from './data-create/data-create.component';
import { MybatisDataRetrieveComponent } from './data-retrieve/data-retrieve.component';
import { MybatisDataUpdateComponent } from './data-update/data-update.component';

const routes: Routes = [
  { path: 'create', component: MybatisDataCreateComponent },
  { path: 'retrieve', component: MybatisDataRetrieveComponent },
  { path: 'update', component: MybatisDataUpdateComponent }
];

@NgModule({
  imports: [
    AppSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MybatisDataFormComponent,
    MybatisDataCreateComponent,
    MybatisDataRetrieveComponent,
    MybatisDataUpdateComponent],
  providers: [
    MybatisDemoDataOprService
  ]
})
export class MybatisDataModule { }
