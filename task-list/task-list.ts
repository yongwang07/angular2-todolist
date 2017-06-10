import {Component, ViewEncapsulation, ChangeDetectionStrategy, 
  Input, Output, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import {ITask, IProject} from '../models';
import {ActivityService} from '../activities/activity-service'

function limitWithEllipsis(str: string, limit: number) {
  if (str.length > limit) {
    return str.slice(0, limit - 1) + '…';
  } else {
    return str;
  }
}

@Component({
  selector: 'ngc-task-list',
  host: {
    class: 'task-list'
  },
  moduleId: module.id,
  templateUrl: 'task-list.html',
  styleUrls: ['task-list.css', 'draggable.css'],
  encapsulation: ViewEncapsulation.None
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskList implements OnChanges {
  @Input() tasks: ITask[];
  @Output() tasksUpdated = new EventEmitter();

  taskFilterList: string[] = ['all', 'open', 'done'];
  selectedTaskFilter: string = 'all';
  filteredTasks: ITask[];

  constructor(private activityService: ActivityService) {}
  
  taskFilterChange(filter: string) {
      this.selectedTaskFilter = filter;
      this.filteredTasks = this.tasks ? this.tasks.filter((task) => {
        if (filter === 'all') {
          return true;
        } else if (filter === 'open') {
          return !task.done;
        } else {
          return task.done;
        }
      }) : [];
  }

  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    if (changes.tasks) {
      this.taskFilterChange(this.selectedTaskFilter);
    }
  }

  onTaskUpdated(task: ITask, updatedData: number) {
    const tasks = this.tasks.slice();
    const oldTask = tasks.splice(tasks.indexOf(task), 1, Object.assign({}, task, updatedData))[0];
    this.tasksUpdated.next(tasks);
    this.activityService.logActivity(
      '1234',
      'tasks',
      'A task was updated',
      `The task "${limitWithEllipsis(oldTask.title, 30)}" was updated on #1234.`
    );
  }

  onTaskDeleted(task: ITask) {
    const tasks = this.tasks.slice();
    const removed = tasks.splice(tasks.indexOf(task), 1)[0];
    this.tasksUpdated.next(tasks);
    this.activityService.logActivity(
      '1234',
      'tasks',
      'A task was deleted',
      `The task "${limitWithEllipsis(removed.title, 30)}" was deleted from #1234.`
    );
  }

  addTask(title: string) {
    const tasks = this.tasks.slice();
    tasks.push({
      created: +new Date(),
      title,
      done: null
    });
    this.tasksUpdated.emit(tasks);
    this.activityService.logActivity(
      '1234',
      'tasks',
      'A task was added',
      `A new task "${limitWithEllipsis(title, 30)}" was added to #1234.`
    );
  }
  
  onTaskDrop(source: ITask, target: ITask) {
    if (source.position === target.position) {
      return;
    }

    let tasks = this.tasks.slice();
    const sourceIndex = tasks.findIndex(
      (task) => task.position === source.position
    );
    const targetIndex = tasks.findIndex(
      (task) => task.position === target.position
    );
    tasks.splice(targetIndex, 0, tasks.splice(sourceIndex, 1)[0]);
    tasks = tasks.map((task, index) => {
      return Object.assign({}, task, {
        position: index
      });
    });
    this.tasksUpdated.emit(tasks);
  }

}