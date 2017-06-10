import {Component, Input, ViewEncapsulation, HostBinding} from '@angular/core';

@Component({
  selector: 'ngc-tab',
  host: {
    class: 'tabs__tab'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class Tab {
  @Input() name: string;
  
  @HostBinding('class.tabs__tab--active') 
  active = false;
}