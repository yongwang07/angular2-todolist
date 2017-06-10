import {Component, Input, Output, ViewEncapsulation, 
  HostBinding, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {ITask} from '../models';

@Component({
  selector: 'ngc-task',
  host: {
    class: 'task'
  },
  moduleId: module.id,
  templateUrl: 'task.html',
  styleUrls: ['task.css'],
  encapsulation: ViewEncapsulation.None, 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Task {
  @Input() task: ITask;
  @Output() taskUpdated = new EventEmitter();
  @Output() taskDeleted = new EventEmitter();

  @HostBinding('class.task--done')
  get done() {
    return this.task && this.task.done;
  }

  markDone(checked: boolean) {
    this.taskUpdated.next({
      title: this.task.title,
      done: checked ? +new Date() : null
    });
  }

  deleteTask() {
    this.taskDeleted.next();
  }
}