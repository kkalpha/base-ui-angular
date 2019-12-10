import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableInfo } from './list-table';

@Component({
    selector: 'app-list-table',
    templateUrl: 'list-table.component.html'
})

export class ListTableComponent implements OnInit {

    @Input() tableInfo: TableInfo = {
        total: 0,
        pageIndex: 1,
        pageSize: 5,
        isEmptyTableVisible: true,
        showSizeChanger: true,
        loading: false,
        dataColumns: [],
        buttonColumn: { headLabel: '', buttons: [] },
        data: []
    };


    @Output() private pageChange = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    refreshTable(e, type) {
        this.pageChange.emit({
            value: e,
            type: type
        });
    }

    formatContent(data, head): string {
        if (data[head.key]) {
            return head.formatContent ? head.formatContent(data[head.key]) : data[head.key];
        } else {
            return head.formatWhenEmpty ? head.formatWhenEmpty(data[head.key]) : '';
        }
    }

    isButtonsVisible() {
        // return this.buttons && this.buttons.buttons && this.buttons.buttons.length > 0;
        return this.tableInfo.buttonColumn && this.tableInfo.buttonColumn.buttons && this.tableInfo.buttonColumn.buttons.length > 0;
    }
}
