import { Directive, Input, ElementRef, Renderer, HostListener } from '@angular/core';

@Directive({
    selector: '[custBackgroundColor]'
})
export class CustomizeBackgroundDirective {
    private _defaultColor = 'white';

    @Input('custBackgroundColor') custBackgroundColor: string; 

    constructor(private elementRef: ElementRef, private renderer: Renderer) {
        this.setStyle(this._defaultColor);
    }

    @HostListener('click')
    onClick() {
        this.setStyle(this.custBackgroundColor || this._defaultColor);
    }

    private setStyle(color: string) {
        this.renderer.setElementClass(this.elementRef.nativeElement, 'cust-font-size', true);
        this.renderer.setElementStyle(this.elementRef.nativeElement,
            'backgroundColor', color);
    }
}
