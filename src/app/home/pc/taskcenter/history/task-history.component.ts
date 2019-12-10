import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HandlerService } from 'src/app/uilib/services/handler.service';
import { TaskService } from 'src/app/home/core/common/task.service';

@Component({
    selector: 'app-history',
    templateUrl: './task-history.component.html',
    styleUrls: ['./task-history.component.less']
})

export class TaskHistoryComponent implements OnInit {
    statusChecked = 'Approved';
    tableData = [];
    total = 0;
    pageIndex = 1;
    pageSize = 8;
    loading = false;

    constructor(
        public handlerService: HandlerService,
        private taskService: TaskService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getApplicationList();
    }

    getApplicationList() {
        this.loading = true;
        const params = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        };
        if (this.statusChecked !== 'All') {
            params['processAction'] = this.statusChecked;
        }
        this.taskService.getHistoryTasks(params).subscribe(
            (res: any) => {
                if (res && res.success) {
                    this.loading = false;
                    this.total = res.total;
                    this.tableData = res.data;
                } else {
                    this.loading = false;
                    this.handlerService.handleException(res.statusCode, res.exceptionId, res.msg);
                }
            },
            (err: any) => {
                this.loading = false;
            }
        );
    }

    refreshTable(value: number, type: string) {
        if (type === 'index') {
            this.pageIndex = value;
        } else {
            this.pageSize = value;
            this.pageIndex = 1;
        }
        this.getApplicationList();
    }

    filterTable() {
        this.pageIndex = 1;
        this.getApplicationList();
    }

    view(data: any) {
        // this.speakerService.speakerData = data;
        // this.router.navigate([PCURLConstants.URL_SPEAKER_DETAIL], {
        //     queryParams: {
        //         'backTo': PCURLConstants.URL_TASK_HISTORY
        //     }
        // });
    }

    showWorkFlowInfo(data: any) {
        this.taskService.getLogs(data.processInstanceId);
    }
}
