import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-func1',
  templateUrl: './func1.component.html',
  styleUrls: ['./func1.component.less']
})
export class Func1Component {
  hidden: boolean = false;
  fullScreen: boolean = false;
  topFlag: boolean = false;
  tintColor: string = '#108ee9';
  unselectedTintColor: string = '#888';
  tabbarStyle: object = { height: '400px' };

  showTabBar(event) {
    event.preventDefault();
    this.hidden = !this.hidden;
  }

  showFullScreen(event) {
    event.preventDefault();
    this.fullScreen = !this.fullScreen;
    this.tabbarStyle = this.fullScreen
      ? {
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0
      }
      : { height: '400px' };
  }

  changePosition(event) {
    event.preventDefault();
    this.topFlag = !this.topFlag;
  }

  onPress(event) {
    console.log('event: ', event);
  }

}
