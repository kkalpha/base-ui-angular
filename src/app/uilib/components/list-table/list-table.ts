export class DataColumn {
    key: string;
    headLabel: string;
    /** text click event */
    clickEvent?: Function;
    /** convert text */
    formatContent?: Function;
    formatWhenEmpty?: Function;
}

// export class TableButtons {
//     /** button column head title */
//     headLabel: string;
//     buttons: TableButton[];
// }
export class ButtonColumn {
    /** button column head title */
    headLabel: string;
    buttons: TableButton[];
}
export class TableButton {
    label: string;
    /** button click event */
    event: Function;
    /** button show event */
    isVisible: Function;
}

export class TableInfo {
    total: number;
    pageIndex: number;
    pageSize: number;
    isEmptyTableVisible: boolean;
    showSizeChanger: boolean;
    loading?: boolean;
    dataColumns?: DataColumn[];
    buttonColumn?: ButtonColumn;
    data?: any[];
}

export function setTableData(tableInfo: TableInfo, res: any): void {
    tableInfo.loading = false;
    if (res.total) {
        tableInfo.total = res.total;
    }
    if (res.data) {
        tableInfo.data = res.data;
    }
}

export function setTaskTableData(tableInfo: TableInfo, res: any): void {
    tableInfo.loading = false;
    if (res.total) {
        tableInfo.total = res.total;
    }
    if (res.data && res.data.details) {
        tableInfo.data = [];
        let item;
        res.data.details.forEach(element => {
            item = element.bizData;
            item['taskDefKey'] = element.taskDefKey;
            tableInfo.data.push(item);
        });
    }
}