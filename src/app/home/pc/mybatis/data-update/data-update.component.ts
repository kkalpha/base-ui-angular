import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HandlerService } from 'src/app/uilib/services/handler.service';
import { MybatisDemoDataOprService } from 'src/app/home/core/data/mybatis-demo-data-opr.service';
import { DatePipe } from '@angular/common';
import { MybatisDataFormComponent } from '../data-form/data-form.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'mybatis-app-update',
  templateUrl: './data-update.component.html',
  styleUrls: ['./data-update.component.less']
})
export class MybatisDataUpdateComponent implements OnInit, AfterViewInit, OnDestroy {

  isProcessing = false;
  routerSubscription;
  initData = {};
  disabledFields = ['empId', 'departureDate'];
  @ViewChild(MybatisDataFormComponent) dataForm: MybatisDataFormComponent;

  constructor(
    private demoDataOprService: MybatisDemoDataOprService,
    private datePipe: DatePipe,
    public handlerService: HandlerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.initData = this.demoDataOprService.currentDemoData;
  }

  ngAfterViewInit() {
    this.routerSubscription = this.activatedRoute.queryParams.subscribe(params => {
      const data = params['data'];
      console.dir(data);
      if (data) {
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

  }
  update() {
    this.isProcessing = true;
    const formGroup = this.dataForm.formGroup;
    const demoData = this.demoDataOprService.currentDemoData;

    // TODO, this is too cumbersome, anyway to improve?
    demoData['transportation'] = formGroup.controls['transportation'].value;
    demoData['tripReason'] = formGroup.controls['tripReason'].value;
    demoData['remark'] = formGroup.controls['remark'].value;
    demoData['returnDate'] = this.datePipe.transform(formGroup.controls['returnDate'].value, 'yyyy-MM-dd HH:mm:ss');

    this.demoDataOprService.updateData(demoData).subscribe((res) => {
      this.isProcessing = false;
      this.handlerService.handleSuccess(res.msg);
    }, (err) => {
      this.isProcessing = false;
    }
    );
  }

  delete() {
    this.modalService.confirm({
      nzTitle: this.translate.instant('Warning'),
      nzContent: this.translate.instant('AlertDelete'),
      nzOkText: this.translate.instant('Confirm'),
      nzCancelText: this.translate.instant('Cancel'),
      nzOnOk: () => {
        this.demoDataOprService.deleteData(this.demoDataOprService.currentDemoData).subscribe((res) => {
          this.isProcessing = false;
          this.handlerService.handleSuccess(res.msg);
        }, (err) => {
          this.isProcessing = false;
        }
        );
      }
    });

  }
  cancel() {
    this.handlerService.closeAlert();
    this.router.navigate(['/pc/mybatis/data/retrieve']);
  }

}

