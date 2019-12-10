import { Component, OnInit, ViewChild } from '@angular/core';
import { HandlerService } from 'src/app/uilib/services/handler.service';
import { DemoDataOprService } from 'src/app/home/core/data/demo-data-opr.service';
import { DatePipe } from '@angular/common';
import { DataFormComponent } from '../data-form/data-form.component';
import { checkFormValid } from 'src/app/uilib/util/util';


@Component({
  selector: 'app-create',
  templateUrl: './data-create.component.html',
  styleUrls: ['./data-create.component.less']
})
export class DataCreateComponent implements OnInit {

  isProcessing = false;

  @ViewChild(DataFormComponent) dataForm: DataFormComponent;

  constructor(
    private demoDataOprService: DemoDataOprService,
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

    const demoData = formGroup.value;

    // TODO, this is too cumbersome, anyway to improve?
    demoData['departureDate'] = this.datePipe.transform(formGroup.controls['departureDate'].value, 'yyyy-MM-dd HH:mm:ss');
    demoData['returnDate'] = this.datePipe.transform(formGroup.controls['returnDate'].value, 'yyyy-MM-dd HH:mm:ss');

    this.demoDataOprService.addData(demoData).subscribe((res) => {
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
