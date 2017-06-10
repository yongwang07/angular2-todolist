import {Component, Input, Output, ViewEncapsulation, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {parseDuration} from '../utils/time-utility';

@Component({
  selector: 'ngc-duration',
  host: {
    class: 'duration'
  },
  moduleId: module.id,
  templateUrl: 'duration.html',
  styleUrls: ['duration.css'],
  encapsulation: ViewEncapsulation.None
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class Duration {
  @Input() duration: number;
  @Output() durationChange = new EventEmitter();

  onEditSaved(formattedDuration: string) {
    this.durationChange.emit(formattedDuration ? parseDuration(formattedDuration) : null);
  }
}