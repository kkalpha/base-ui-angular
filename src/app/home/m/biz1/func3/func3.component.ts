import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-func3',
  templateUrl: './func3.component.html',
  styleUrls: ['./func3.component.less']
})
export class Func3Component {
  singleArea = [
    '东城区',
    '西城区',
    '崇文区',
    '宣武区',
    '朝阳区',
    '丰台区',
    '石景山区',
    '海淀区',
    '门头沟区',
    '房山区',
    '通州区',
    '顺义区',
    '昌平区',
    '大兴区',
    '平谷区',
    '怀柔区',
    '密云县',
    '延庆县'
  ];
  seasons = [
    {
      label: '2013',
      children: [
        {
          label: '春',
          children: []
        },
        {
          label: '夏',
          children: []
        }
      ]
    },
    {
      label: '2014',
      children: [
        {
          label: '春'
        },
        {
          label: '夏'
        }
      ]
    }
  ];
  name1 = '选择';
  name2 = '选择';
  name3 = '选择';
  name4 = '选择';
  value = [];
  value1 = [];
  value2 = [];
  value3 = [];
  value4 = [];

  onOk1(result) {
    this.name1 = this.getResult(result);
    this.value1 = this.getValue(result);
  }

  onOk2(result) {
    this.name2 = this.getResult(result);
    this.value2 = this.getValue(result);
  }

  onOk3(result) {
    this.name3 = this.getResult(result);
    this.value3 = this.getValue(result);
  }

  onOk4(result) {
    this.name4 = this.getResult(result);
    this.value4 = this.getValue(result);
  }

  onPickerChange(result) {
    this.name4 = this.getResult(result);
    this.value4 = this.getValue(result);
  }

  getResult(result) {
    this.value = [];
    let temp = '';
    result.forEach(item => {
      this.value.push(item.label || item);
      temp += item.label || item;
    });
    return this.value.map(v => v).join(',');
  }

  getValue(result) {
    let value = [];
    let temp = '';
    result.forEach(item => {
      value.push(item.label || item);
      temp += item.label || item;
    });
    return value;
  }

}
