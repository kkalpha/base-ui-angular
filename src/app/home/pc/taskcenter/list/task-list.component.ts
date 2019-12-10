import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HandlerService } from 'src/app/uilib/services/handler.service';
import { TaskService } from 'src/app/home/core/common/task.service';
import { ReimburseWorkflowService } from 'src/app/home/core/workflow/reimbursement-workflow.service';
import { ReimbursementConsts } from '../../reimbursement/reimbursement.const';


@Component({
    selector: 'app-tasklist',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {

    tableData = [];
    total = 0;
    pageIndex = 1;
    pageSize = 10;
    loading = false;

    tVal: String = 'abc';
    constructor(
        public handlerService: HandlerService,
        private taskService: TaskService,
        private reimburseWorkflowService: ReimburseWorkflowService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getTaskList();
    }

    getTaskList() {
        this.loading = true;
        const params = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        };

        this.taskService.getTasks(params).subscribe(
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
        this.getTaskList();
    }

    filterTable() {
        this.pageIndex = 1;
        this.getTaskList();
    }

    process(data: any) {
        this.reimburseWorkflowService.currentRequest = data;

        this.router.navigate([ReimbursementConsts.URI_PROCESS]);
    }

    showWorkFlowInfo(data: any) {
        this.taskService.getLogs(data.processInstanceId);
    }

}
