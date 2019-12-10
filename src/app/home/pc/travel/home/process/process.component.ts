import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkFlowFormComponent } from '../../form/form.component';
import { ReimburseWorkflowService } from 'src/app/home/core/workflow/reimbursement-workflow.service';
import { HandlerService } from 'src/app/uilib/services/handler.service';
import { Router } from '@angular/router';
import { TravelConsts } from '../../travel.const';


@Component({
  selector: 'app-wf-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.less']
})
export class ProcessComponent implements OnInit {


  isProcessing = false;

  @ViewChild(WorkFlowFormComponent) dataForm: WorkFlowFormComponent;

  initData = {};
  disabledFields = ['fromDate', 'toDate', 'totalAmount'];

  constructor(
    private reimburseWorkflowService: ReimburseWorkflowService,
    private router: Router,
    public handlerService: HandlerService
  ) {
  }
  ngOnInit() {
    this.initData = this.reimburseWorkflowService.currentRequest;
  }


  private process(status: string) {
    this.handlerService.closeAlert();
    this.isProcessing = true;
    const formGroup = this.dataForm.formGroup;

    // if (!checkFormValid(formGroup)) {
    //   this.isProcessing = false;
    //   return;
    // }

    const reqData = this.reimburseWorkflowService.currentRequest;
    reqData.bizData['remark'] = formGroup.controls['remark'].value;
    reqData.bizData['status'] = status;
    this.reimburseWorkflowService.doProcess(reqData).subscribe((res) => {
      this.isProcessing = false;
      this.handlerService.handleSuccess(res.msg);
    }, (err) => {
      this.isProcessing = false;
    }
    );
  }
  approve() {
    this.process('InProgress');
  }

  reject() {
    this.process('Rejected');
  }
  back() {
    this.router.navigate([TravelConsts.URI_TASKS],
    {
      queryParams: {
        'definitionkey': this.initData['taskDefKey']
      }
    });
  }
}
