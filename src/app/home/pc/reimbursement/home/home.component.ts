import { Component, OnInit } from '@angular/core';
import { HandlerService } from 'src/app/uilib/services/handler.service';

@Component({
  selector: 'app-reimbursement-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(
    private handlerService: HandlerService
  ) { }

  ngOnInit() {
  }
  initTasks() {
    this.handlerService.closeAlert();
  }
  initHistory() {
    this.handlerService.closeAlert();
  }
}
