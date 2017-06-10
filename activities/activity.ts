import {Component, ViewEncapsulation, Input, HostBinding} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {IActivity} from '../models';

@Component({
  selector: 'ngc-activity',
  host: {
    class: 'activity'
  },
  moduleId: module.id,
  templateUrl: 'activity.html',
  styleUrls: ['activity.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Activity {
  @Input() activity: IActivity;
  @Input() alignment: string;
  @Input() @HostBinding('class.activity--start-mark') startMark: boolean;
  @Input() @HostBinding('class.activity--end-mark') endMark: boolean;
  constructor(private ds: DomSanitizer){}
  sanitize(url:string){
    return this.ds.bypassSecurityTrustUrl(url);
  }
  isAlignedRight() {
    return this.alignment === 'right';
  }
}