
import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, FormControl } from '@angular/forms';
@Directive({
    selector: '[appRemoteValidator][ngModel]',
    providers: [{
        provide: NG_ASYNC_VALIDATORS, useExisting: RemoteValidatorDirective,
        multi: true
    }]
})

export class RemoteValidatorDirective {
    @Input() appRemoteValidator: string;
    @Input() validateFunction: (value: string) => Promise<boolean>;

    validate(control: FormControl): { [key: string]: any } {
        const value: string = control.value;
        console.log(value);
        return this.validateFunction(value).then((result: boolean) => {
            if (result) {
                return null;
            } else {
                const error: any = {};
                error[this.appRemoteValidator] = true;
                return error;
            }
        });
    }

    // @HostListener('blur') 
    // onblur(){

    // }
}
