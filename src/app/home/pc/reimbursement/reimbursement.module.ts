import { NgModule } from '@angular/core';
import { RequestComponent } from './request/request.component';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from 'src/app/share.module';
import { RequestHistoryComponent } from './request/history/history.component';
import { WorkFlowFormComponent } from './form/form.component';
import { NewComponent } from './request/new/new.component';
import { DetailViewComponent } from './request/detail-view/detail-view.component';
import { TasksComponent } from './home/tasks/tasks.component';
import { ProcessComponent } from './home/process/process.component';
import { ProcessHistoryComponent } from './home/history/history.component';
import { TaskGroupComponent } from './home/task-group/task-group.component';
import { TaskCardComponent } from './home/task-group/task-card/task-card.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'request', component: RequestComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'home', component: HomeComponent },
  { path: 'process', component: ProcessComponent }
];

@NgModule({
  imports: [
    AppSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RequestComponent,
    HomeComponent,
    RequestHistoryComponent,
    WorkFlowFormComponent,
    NewComponent,
    DetailViewComponent,
    TasksComponent,
    ProcessHistoryComponent,
    ProcessComponent,
    TaskGroupComponent,
    TaskCardComponent
  ]
  // providers: [
  //   ReimburseWorkflowService
  // ]
})
export class ReimbursementModule { }
