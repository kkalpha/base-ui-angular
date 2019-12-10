import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HandlerService } from 'src/app/uilib/services/handler.service';
import { populateFormGroupValues } from 'src/app/uilib/util/util';
import { Regex } from 'src/app/uilib/util/Regex';

@Component({
  selector: 'app-wf-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class WorkFlowFormComponent implements OnInit {

  formGroup: FormGroup;

  @Input() initData = {};

  // wehn edit a existing data, some form controls should be disabled editing
  @Input() disabledFields = [];

  constructor(
    private fb: FormBuilder,
    public handlerService: HandlerService
  ) {
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.formGroup = this.fb.group({
      id: [''],
      fromDate: [new Date(), [Validators.required]],
      toDate: [new Date(), [Validators.required]],
      totalAmount: [1000, [Validators.required, Validators.max(100000), Validators.pattern(Regex.FLOAT)]],
      remark: ['test', [Validators.required]]
    });
    this.disabledFields.forEach((field) => {
      this.formGroup.controls[field].disable();
    });
    populateFormGroupValues(this.formGroup, this.initData);

  }
}
