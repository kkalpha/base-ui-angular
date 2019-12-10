import { Component, OnInit } from '@angular/core';
import { HandlerService } from 'src/app/uilib/services/handler.service';
import { ReimburseWorkflowService } from 'src/app/home/core/workflow/reimbursement-workflow.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/home/core/common/task.service';
import { TravelConsts } from '../../travel.const';


@Component({
  selector: 'app-wf-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.less']
})
export class TasksComponent implements OnInit {

  tableData = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  loading = false;

  definitionkey;

  constructor(
    public handlerService: HandlerService,
    private reimburseWorkflowService: ReimburseWorkflowService,
    private taskService: TaskService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['definitionkey']) {
        this.definitionkey = params['definitionkey'];
      }

    });

    this.getTasks();
  }

  getTasks() {
    this.loading = true;

    const params = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    params['definitionkey'] = this.definitionkey;

    this.reimburseWorkflowService.getTasks(params).subscribe((res) => {
      if (res && res.success) {
        this.loading = false;
        this.total = res.total;
        this.tableData = res.data;
      } else {
        this.loading = false;
        this.handlerService.handleException(res.statusCode, res.exceptionId, res.msg);
      }
    }, (err) => {
      this.loading = false;
    }
    );
  }

  refreshTable(pageParams: any) {
    if (pageParams.type === 'index') {
      this.pageIndex = pageParams.value;
    } else {
      this.pageSize = pageParams.value;
      this.pageIndex = 1;
    }
    this.getTasks();
  }

  showWorkFlowInfo(data: any) {
    this.taskService.getLogs(data.processInstanceId);
  }

  process(data: any) {

    this.reimburseWorkflowService.currentRequest = data;
    this.router.navigate([TravelConsts.URI_PROCESS]);
  }

  back() {
    this.router.navigate([TravelConsts.URI_HOME]);
  }
}
