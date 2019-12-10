import { Component, OnInit, Input, ElementRef, NgModuleFactory, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'app-dynamic-template',
    templateUrl: './dynamic-template.component.html',
    styleUrls: ['./dynamic-template.component.less']
})

export class DynamicComComponent implements OnInit {
    dynamicComponent: any;
    dynamicModule: NgModuleFactory<any>;
    @Input('html') html: string;
    @Input('js') js: string;

    constructor(
        // private compiler: Compiler,
        // private renderer2: Renderer2,
        @Inject(DOCUMENT) private _document,
        private elementRef: ElementRef
    ) { }

    ngOnInit() {
        this.ngAfterViewInit();
    }

    //if changes are recompiled
    ngOnChanges(changes: string) {
        if (changes['html'] && !changes['html'].isFirstChange() ||
            changes['js'] && !changes['js'].isFirstChange()) {
            this.ngAfterViewInit();
        }
    }

    ngAfterViewInit() {
        if (this.js) {
            var js = document.createElement("script");
            js.type = "text/javascript";
            js.text = this.js;
            this.elementRef.nativeElement.appendChild(js);
        }
    }
}