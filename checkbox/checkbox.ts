import {Component, Input, Output, ViewEncapsulation, EventEmitter} from '@angular/core';

@Component({
  selector: 'ngc-checkbox',
  host: {
    class: 'checkbox'
  },
  moduleId: module.id,
  templateUrl: 'checkbox.html',
  styleUrls: ['checkbox.css'],
  encapsulation: ViewEncapsulation.None
})
export class Checkbox {
  @Input() label: string;
  @Input() checked: boolean;
  @Output() checkedChange = new EventEmitter();

  onCheckedChange(checked: boolean) {
    this.checkedChange.emit(checked);
  }
}