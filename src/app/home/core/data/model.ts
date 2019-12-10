
export class DemoDataOpr {
    constructor(
        public id: string,
        public empId: string,
        public departureDate: Date,
        public returnDate: Date,
        public transportation: string,
        public tripReason: string,
        public remark: string,
        public createUser: string,
        public createTime: Date,
        public updateUser: string,
        public updateTime: Date,
        public version: number,
    ) { }
}
