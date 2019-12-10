import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from 'src/app/share.module';
import { DemoDataOprService } from '../../core/data/demo-data-opr.service';
import { DataFormComponent } from './data-form/data-form.component';
import { DataCreateComponent } from './data-create/data-create.component';
import { DataRetrieveComponent } from './data-retrieve/data-retrieve.component';
import { DataUpdateComponent } from './data-update/data-update.component';

const routes: Routes = [
  { path: 'create', component: DataCreateComponent },
  { path: 'retrieve', component: DataRetrieveComponent },
  { path: 'update', component: DataUpdateComponent }
];

@NgModule({
  imports: [
    AppSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DataFormComponent,
    DataCreateComponent,
    DataRetrieveComponent,
    DataUpdateComponent],
  providers: [
    DemoDataOprService
  ]
})
export class DataModule { }
