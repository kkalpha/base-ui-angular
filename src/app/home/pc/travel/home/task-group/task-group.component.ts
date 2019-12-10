import { Component, OnInit } from '@angular/core';
import { ReimburseWorkflowService } from 'src/app/home/core/workflow/reimbursement-workflow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wf-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.less']
})
export class TaskGroupComponent implements OnInit {
  tasks = [
    { definitionkey: 'reimbursement-mgr-approve', name: 'Manager Approval', count: 0 },
    { definitionkey: 'reimbursement-secondary-approve', name: 'Secondary Approval', count: 0 },
    { definitionkey: 'reimbursement-top-approve', name: 'Top Approval', count: 0 },
  ];
  constructor(
    private reimburseWorkflowService: ReimburseWorkflowService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getOverallTasks();
  }
  getOverallTasks() {

    this.reimburseWorkflowService.getOverAllTasks().subscribe((res) => {
      if (res.success && res.data) {
        res.data.forEach(element => {

          this.tasks.forEach(item => {
            if (item.definitionkey === element.definitionkey) {
              item.count = element.count;
              // break; ? for each can not break
            }
          });

        });
      }
    }, (err) => {

    }
    );
  }
}
