import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'ngc-efforts-timeline',
  host: {
    class: 'efforts-timeline'
  },
  moduleId: module.id,
  templateUrl: 'effort-timeline.html',
  styleUrls: ['effort-timeline.css'],
  encapsulation: ViewEncapsulation.None
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class EffortsTimeline {
  @Input() estimated: number;
  @Input() effective: number;
  @Input() height: number;
  done: number;
  overtime: number;

  ngOnChanges(changes: any) {
    this.done = 0;
    this.overtime = 0;

    if (!this.estimated && this.effective || (this.estimated && this.estimated === this.effective)) {
      this.done = 100;
    } else if (this.estimated < this.effective) {
      this.done = this.estimated / this.effective * 100;
      this.overtime = 100 - this.done;
    } else {
      this.done = this.effective / this.estimated * 100;
    }
  }
}