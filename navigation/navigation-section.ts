import {Component, ViewEncapsulation, Input} from '@angular/core';
import {NavigationItem} from './navigation-item';

@Component({
  selector: 'ngc-navigation-section',
  host: {
    class: 'navigation-section'
  },
  moduleId: module.id,
  templateUrl: 'navigation-section.html',
  styleUrls: ['navigation-section.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationSection {
  @Input() title: string;
  @Input() items: NavigationItem[];
}