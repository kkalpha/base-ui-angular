import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TravelConsts } from '../../../travel.const';

@Component({
  selector: 'app-wf-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.less']
})
export class TaskCardComponent implements OnInit {

  @Input() taskData = {};

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  processList(data) {
    this.router.navigate([TravelConsts.URI_TASKS], {
      queryParams: {
        'definitionkey': data
      }
    });
  }
}
