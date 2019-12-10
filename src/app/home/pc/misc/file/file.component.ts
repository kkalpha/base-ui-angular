import { Component, OnInit } from '@angular/core';
import { HandlerService } from 'src/app/uilib/services/handler.service';

@Component({
  selector: 'app-misc-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.less']
})
export class FileComponent implements OnInit {

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
