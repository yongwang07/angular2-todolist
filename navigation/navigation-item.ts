import {Component, ViewEncapsulation, ViewChild, Input, Inject} from '@angular/core';

@Component({
  selector: 'ngc-navigation-item',
  host: {
    class: 'navigation-item',
    role: 'listitem'
  },
  template:`<a class="navigation-section__link"
   routerLinkActive="navigation-section__link--active"
   [routerLink]="link">{{title}}</a>`,
   styleUrls: ['.navigation-item {display: list-item;}'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationItem {
  @Input() title: string;
  @Input() link: string; 
}