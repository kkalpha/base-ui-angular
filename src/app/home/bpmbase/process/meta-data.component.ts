import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-meta-data',
  templateUrl: './meta-data.component.html',
  styleUrls: ['./meta-data.component.less']
})
export class MetaDataComponent implements OnInit {
  tabs = [
    {
      index: 1
    },
    {
      index: 2
    },
    {
      index: 3
    }
  ];

  validateForm: FormGroup;

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      category: ['HR', [Validators.required]],
      file: [null, [Validators.required]]
    });
  }


}
