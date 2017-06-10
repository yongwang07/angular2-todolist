import {Component, Input, Output, ViewEncapsulation, 
  EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'ngc-toggle',
  host: {
    class: 'toggle'
  },
  moduleId: module.id,
  templateUrl: 'toggle.html',
  styleUrls: ['toggle.css'],
  encapsulation: ViewEncapsulation.None
})
export class Toggle implements OnInit {
  @Input() buttonList: string[];
  @Input() selectedButton: string;
  @Output() selectedButtonChange = new EventEmitter();

  ngOnInit() {
    if (this.selectedButton === undefined) {
      this.selectedButton = this.buttonList[0];
    }
  }

  onButtonActivate(button: string) {
    this.selectedButton = button;
    this.selectedButtonChange.emit(button);
  }
}