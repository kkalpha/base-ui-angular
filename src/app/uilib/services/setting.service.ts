import { Injectable } from '@angular/core';

const KEY = 'layout';

export interface Layout {
    /** 是否折叠右边菜单 */
    sideCollapsed: boolean;
    /** 是否折叠header菜单 */
    headerCollapsed: boolean;
    /** 语言环境 */
    lang: string;
    deviceType: string;
}

@Injectable()
export class SettingService {
    private _layout: Layout = null;

    private get(key: string) {
        return JSON.parse(localStorage.getItem(key) || 'null') || null;
    }

    private set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get layout(): Layout {
        if (!this._layout) {
            this._layout = Object.assign(<Layout>{
                sideCollapsed: false,
                headerCollapsed: false,
                deviceType: 'pc',
                lang: null
            }, this.get(KEY));
            this.set(KEY, this._layout);
        }
        return this._layout;
    }

    setLayout(name: string, value: any): boolean {
        if (typeof this.layout[name] !== 'undefined') {
            this.layout[name] = value;
            this.set(KEY, this._layout);
            return true;
        }
        return false;
    }

}
