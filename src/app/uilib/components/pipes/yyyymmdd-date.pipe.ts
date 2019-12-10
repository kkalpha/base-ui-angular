import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'yyyymmddDate'
})
export class YYYYMMDDDatePipe implements PipeTransform {
    // precondition assumed is the datatime is passed in as yyyy MM dd hh mm ss ....
    transform(value: string, ...args: number[]): any {
        if (value == null || value.length <= 10) {
            return value;
        } else {
            return value.substring(0, 10);
        }

    }

}
