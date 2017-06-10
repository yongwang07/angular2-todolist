import {Component, Output, ViewEncapsulation, EventEmitter} from '@angular/core';

@Component({
  selector: 'ngc-enter-task',
  host: {
    class: 'enter-task'
  },
  moduleId: module.id,
  templateUrl: 'enter-task.html',
  styleUrls: ['enter-task.css'],
  encapsulation: ViewEncapsulation.None
})
export class EnterTask {
  @Output() taskEntered = new EventEmitter();

  enterTask(titleInput: any) {
    this.taskEntered.emit(titleInput.value);
    titleInput.value = '';
    titleInput.focus();
  }
}