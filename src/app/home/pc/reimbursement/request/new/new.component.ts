import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkFlowFormComponent } from '../../form/form.component';
import { DatePipe } from '@angular/common';
import { HandlerService } from 'src/app/uilib/services/handler.service';
import { checkFormValid } from 'src/app/uilib/util/util';
import { ReimburseWorkflowService } from 'src/app/home/core/workflow/reimbursement-workflow.service';

@Component({
  selector: 'app-wf-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less']
})
export class NewComponent implements OnInit {


  isProcessing = false;

  @ViewChild(WorkFlowFormComponent) dataForm: WorkFlowFormComponent;

  constructor(
    private reimburseWorkflowService: ReimburseWorkflowService,
    private datePipe: DatePipe,
    public handlerService: HandlerService
  ) {
  }

  ngOnInit() {
  }


  create() {
    this.handlerService.closeAlert();
    this.isProcessing = true;
    const formGroup = this.dataForm.formGroup;

    if (!checkFormValid(formGroup)) {
      this.isProcessing = false;
      return;
    }

    const reqData = formGroup.value;

    // TODO, this is too cumbersome, anyway to improve?
    reqData['fromDate'] = this.datePipe.transform(formGroup.controls['fromDate'].value, 'yyyy-MM-dd HH:mm:ss');
    reqData['toDate'] = this.datePipe.transform(formGroup.controls['toDate'].value, 'yyyy-MM-dd HH:mm:ss');

    this.reimburseWorkflowService.addData(reqData).subscribe((res) => {
        this.isProcessing = false;
        this.handlerService.handleSuccess(res.msg);
      }, (err) => {
        this.isProcessing = false;
      }
    );
  }

  reset() {
    this.handlerService.closeAlert();
    this.dataForm.formGroup.reset();
  }

}
