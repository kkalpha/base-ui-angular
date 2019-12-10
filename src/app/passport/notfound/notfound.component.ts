import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/uilib/services/setting.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.less']
})
export class NotfoundComponent implements OnInit {

  homePath: string;
  constructor(public setting: SettingService) { }

  ngOnInit() {
    this.homePath = '/' + this.setting.layout.deviceType + '/index';
  }

}
