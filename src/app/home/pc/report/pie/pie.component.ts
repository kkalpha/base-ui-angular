import { Component, OnInit } from '@angular/core';
import * as G2 from '@antv/g2';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.less']
})
export class PieComponent implements OnInit {

  data = {};
  chart;
  graph;
  constructor() { }

  ngOnInit() {
    this.basicPie();
    this.anglePie();
  }
  basicPie() {
    this.data = [{
      item: '事例一',
      count: 40,
      percent: 0.4
    }, {
      item: '事例二',
      count: 21,
      percent: 0.21
    }, {
      item: '事例三',
      count: 17,
      percent: 0.17
    }, {
      item: '事例四',
      count: 13,
      percent: 0.13
    }, {
      item: '事例五',
      count: 9,
      percent: 0.09
    }];

    this.chart = new G2.Chart({
      container: 'basicpie',
      forceFit: true,
      width: 600,
      height: 300
    });

    this.chart.source(this.data, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + '%';
          return val;
        }
      }
    });
    this.chart.coord('theta', {
      radius: 0.75
    });
    this.chart.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });
    this.chart.intervalStack().position('percent').color('item').label('percent', {
      formatter: function formatter(val, item) {
        return item.item + ': ' + val;
      }
    }).tooltip('item*percent', function (item, percent) {
      percent = percent * 100 + '%';
      return {
        name: item,
        value: percent
      };
    }).style({
      lineWidth: 1,
      stroke: '#fff'
    });
    this.chart.render();
  }

  anglePie() {
    const data = [{
      type: '分类一',
      value: 27
    }, {
      type: '分类二',
      value: 25
    }, {
      type: '分类三',
      value: 18
    }, {
      type: '分类四',
      value: 15
    }, {
      type: '分类五',
      value: 10
    }, {
      type: 'Other',
      value: 5
    }];

    const chart = new G2.Chart({
      container: 'anglepie',
      forceFit: true,
      width: 600,
      height: 300
    });

    chart.source(data);
    chart.coord('theta');

    chart.coord('theta', {
      radius: 0.75,
      innerRadius: 0,
      startAngle: Math.PI, // 起始角度
      endAngle: Math.PI * (3 / 2) // 结束角度
    });
    chart.intervalStack().position('value').color('type').label('type');

    chart.render();
  }
}
