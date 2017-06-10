import {Component, ViewEncapsulation, Inject, forwardRef} from '@angular/core';
import {Project} from '../project/project';
import {ITask, IProject} from '../models';
import { Router, Routes, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngc-project-task-list',
  template: `<ngc-task-list [tasks]="project.project.tasks"
               (tasksUpdated)="updateTasks($event)"></ngc-task-list>`,
  encapsulation: ViewEncapsulation.None,
})
export class ProjectTaskList {
    project: Project;
  constructor(@Inject(forwardRef(() => Project)) project: Project, route: ActivatedRoute) {
    route.url.subscribe(() =>  this.project = project);
  }

  updateTasks(tasks: ITask[]) {
    this.project.project.tasks = tasks;
    this.project.updateTasks(tasks);
  }
}