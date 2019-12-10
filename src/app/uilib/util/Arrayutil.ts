import { HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

export function isSameIntArray(arr1: number[], arr2: number[]): boolean {
    // this.menuList.sort((a,b) => {
    //   if(a.mid>b.mid){
    //     return 1;
    //   }else{
    //     return -1;
    //   }
    // });
    return true;
}

export function getElementsInArr1NotInArr2(arr1: any[], arr2: any[]): any[] {
    let retArr = [];
    arr1.forEach(element => {
        if (arr2.indexOf(element) == -1) {
            retArr.push(element);
        }
    });
    return retArr;
}


