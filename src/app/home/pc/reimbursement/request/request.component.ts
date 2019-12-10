import { Component, OnInit } from '@angular/core';
import { HandlerService } from 'src/app/uilib/services/handler.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.less']
})
export class RequestComponent implements OnInit {

  constructor(
    private handlerService: HandlerService
  ) { }

  ngOnInit() {
  }
  initNewRequset() {
    this.handlerService.closeAlert();
  }
  initHistory() {
    this.handlerService.closeAlert();
  }
}
