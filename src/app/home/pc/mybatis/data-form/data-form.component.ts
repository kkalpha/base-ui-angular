import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HandlerService } from 'src/app/uilib/services/handler.service';
import { populateFormGroupValues } from 'src/app/uilib/util/util';

@Component({
  selector: 'mybatis-app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.less']
})
export class MybatisDataFormComponent implements OnInit {

  formGroup: FormGroup;

  transportations = [
    { label: 'Flight', value: 'Flight' },
    { label: 'Train', value: 'Train' },
    { label: 'Bus', value: 'Bus' },
    { label: 'Private Car', value: 'Private Car' }
  ];

  reasons = ['Meeting', 'Customer Visiting', 'Trainning'];

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
      empId: ['', [Validators.required, Validators.maxLength(5)]],
      departureDate: [new Date(), [Validators.required]],
      returnDate: [new Date(), [Validators.required]],
      transportation: [null, [Validators.required]],
      tripReason: ['', [Validators.required]],
      remark: ['comments for test data', [Validators.required]]
    });
    this.disabledFields.forEach((field) => {
      this.formGroup.controls[field].disable();
    });
    populateFormGroupValues(this.formGroup, this.initData);

  }
}
