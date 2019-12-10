import { Component, OnInit } from '@angular/core';
import { HandlerService } from 'src/app/uilib/services/handler.service';

@Component({
  selector: 'app-wf-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class RequestHistoryComponent implements OnInit {

  constructor(
    public handlerService: HandlerService
  ) { }

  ngOnInit() {
  }

  search() {
    this.handlerService.handleSuccess('res.msg');
  }
}
