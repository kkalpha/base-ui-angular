import { Component, OnInit } from '@angular/core';
import * as G2 from '@antv/g2';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.less']
})
export class BarComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    this.basicColumn();
    this.doubleColumns();
  }
  basicColumn() {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];
    const chart = new G2.Chart({
      container: 'basicColumn',
      width: 600,
      height: 300
    });

    chart.source(data);
    chart.interval().position('genre*sold').color('genre');
    chart.render();
  }
  doubleColumns() {
    const data = [{
      'name': 'London',
      '月份': 'Jan.',
      '月均降雨量': 18.9
    }, {
      'name': 'London',
      '月份': 'Feb.',
      '月均降雨量': 28.8
    }, {
      'name': 'London',
      '月份': 'Mar.',
      '月均降雨量': 39.3
    }, {
      'name': 'London',
      '月份': 'Apr.',
      '月均降雨量': 81.4
    }, {
      'name': 'London',
      '月份': 'May',
      '月均降雨量': 47
    }, {
      'name': 'London',
      '月份': 'Jun.',
      '月均降雨量': 20.3
    }, {
      'name': 'London',
      '月份': 'Jul.',
      '月均降雨量': 24
    }, {
      'name': 'London',
      '月份': 'Aug.',
      '月均降雨量': 35.6
    }, {
      'name': 'Berlin',
      '月份': 'Jan.',
      '月均降雨量': 12.4
    }, {
      'name': 'Berlin',
      '月份': 'Feb.',
      '月均降雨量': 23.2
    }, {
      'name': 'Berlin',
      '月份': 'Mar.',
      '月均降雨量': 34.5
    }, {
      'name': 'Berlin',
      '月份': 'Apr.',
      '月均降雨量': 99.7
    }, {
      'name': 'Berlin',
      '月份': 'May',
      '月均降雨量': 52.6
    }, {
      'name': 'Berlin',
      '月份': 'Jun.',
      '月均降雨量': 35.5
    }, {
      'name': 'Berlin',
      '月份': 'Jul.',
      '月均降雨量': 37.4
    }, {
      'name': 'Berlin',
      '月份': 'Aug.',
      '月均降雨量': 42.4
    }];
    const chart = new G2.Chart({
      container: 'doubleColumns',
      forceFit: true,
      width: 600,
      height: 300
    });
    chart.source(data);
    chart.interval().position('月份*月均降雨量').color('name').adjust([{
      type: 'dodge',
      marginRatio: 1 / 32
    }]);
    chart.render();
  }
}
