import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from '../../../share.module';
import { TaskListComponent } from './list/task-list.component';
import { TaskHistoryComponent } from './history/task-history.component';

const routes: Routes = [
    { path: 'list', component: TaskListComponent },
    { path: 'history', component: TaskHistoryComponent },
];

@NgModule({
    imports: [
        AppSharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        TaskHistoryComponent,
        TaskListComponent
    ]
})
export class TaskCenterModule { }
