import {Component, ViewEncapsulation, Input, Output, 
    EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Duration} from '../duration/duration';
import {UNITS} from '../utils/time-utility';

@Component({
  selector: 'ngc-efforts',
  host: {
    class: 'efforts'
  },
  moduleId: module.id,
  templateUrl: 'efforts.html',
  styleUrls: ['efforts.css'],
  encapsulation: ViewEncapsulation.None
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class Efforts {
  @Input() estimated: number;
  @Input() effective: number;
  @Output() effortsChange = new EventEmitter();

  onEstimatedChange(estimated: number) {
    this.effortsChange.next({
      estimated,
      effective: this.effective
    });
  }

  onEffectiveChange(effective: number) {
    this.effortsChange.next({
      effective,
      estimated: this.estimated
    });
  }

  addEffectiveHours(hours: number) {
    const hourMilliseconds = UNITS.find((unit) => unit.short === 'h').milliseconds;
    this.effortsChange.next({
      effective: (this.effective || 0) + hours * hourMilliseconds,
      estimated: this.estimated
    });
  }
}