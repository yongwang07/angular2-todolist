import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ngc-navigation',
  host: {
    class: 'navigation'
  },
  template: `<ngc-user-area [openTasksCount]="openTasksCount"></ngc-user-area>
<nav>
  <ng-content select="ngc-navigation-section"></ng-content>
</nav>`,
styleUrls:['.navigation {display: block;}'],
encapsulation: ViewEncapsulation.None
})
export class Navigation {
  @Input() openTasksCount: number;
}