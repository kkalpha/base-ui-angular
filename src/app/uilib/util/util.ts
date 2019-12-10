import { HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

export function looseInvalid(a: string | number): boolean {
    return a === '' || a === null || a === undefined;
}

export function serialize(obj: any): HttpParams {
    let params = new HttpParams();

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && !looseInvalid(obj[key])) {
            params = params.set(key, obj[key]);
        }
    }

    return params;
}

export function transToFormData(fg: FormGroup): FormData {

    const formData = new FormData();

    const fgValue = fg.value;

    for (const key in fgValue) {
        if (fgValue.hasOwnProperty(key) && !looseInvalid(fgValue[key])) {
            formData.append(key, fgValue[key]);
        }
    }

    return formData;
}

export function transFgAndValuesToFormData(fg: FormGroup, values: any): FormData {

    const formData = new FormData();

    const fgValue = fg.value;

    for (const key in fgValue) {
        if (fgValue.hasOwnProperty(key) && !looseInvalid(fgValue[key])) {
            formData.append(key, fgValue[key]);
        }
    }

    for (const key in values) {
        if (values.hasOwnProperty(key) && !looseInvalid(values[key])) {
            formData.append(key, values[key]);
        }
    }

    return formData;
}

export function formateDateText(dateText: string): string {
    return dateText ? dateText.substring(0, 10) : '';
}
// export function populateFormGroupValues2(formGroup: FormGroup, sourceData): void {
//     const controls = formGroup.controls;
//     for (const key in sourceData) {
//         // controls may have less fields than sourceData
//         if (controls.hasOwnProperty(key)) {
//             controls[key].setValue(sourceData[key]);
//         }
//     }
// }

export function populateFormGroupValues(formGroup: FormGroup, sourceData, ignoreKeys?: any): void {
    const controls = formGroup.controls;
    ignoreKeys = ignoreKeys || {};
    for (const key in sourceData) {
        // controls may have less fields than sourceData
        // to ignore some form controls(may not properate to use the raw data from source data)
        if (controls.hasOwnProperty(key) && (!ignoreKeys.hasOwnProperty(key))) {
            controls[key].setValue(sourceData[key]);
        }
    }
}


export function populateRequestValues(formGroup: FormGroup, requestdata): void {
    const controls = formGroup.controls;
    for (const key in controls) {
        // form may have more fields than requestdata needed(those fields don't need to post to backend)
        if (requestdata.hasOwnProperty(key)) {
            requestdata[key] = controls[key].value;
        }
        // for fields in requestdata which are not used in form, keep them untouched
    }
}

export function deepCopyObject(source): any {
    const result = source instanceof Array ? [] : {};
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            result[key] = (typeof source[key] === 'object' && source[key] != null) ? deepCopyObject(source[key]) : source[key];
        }
    }
    return result;
}

export function isNUllOrEmpty(content): boolean {
    if (content && content !== '') {
        return false;
    } else {
        return true;
    }
}

export function trim(content) {
    return content.replace(/^\s+|\s+$/gm, '');
}

export function trimEmptyValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value && trim(control.value) === '') {
        return { required: true };
    }
    return null;
}

export function checkFormValid(formGroup: FormGroup): boolean {
    for (const i in formGroup.controls) {
        if (formGroup.controls.hasOwnProperty(i)) {
            formGroup.controls[i].markAsDirty();
            formGroup.controls[i].updateValueAndValidity();
        }
    }
    if (formGroup.valid) {
        return true;
    } else {
        return false;
    }
}

export function sleep(n) {
    const start = new Date().getTime();
    while (true) {
        if (new Date().getTime() - start > n) {
            break;
        }
    }

}

