import {Component, ViewEncapsulation, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {TaskList} from '../task-list/task-list';
import {ITask, IComment, IProject} from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import * as Data from '../initial-data';

@Component({
  selector: 'ngc-project',
  host: {
    class: 'project'
  },
  moduleId: module.id,
  templateUrl: 'project.html',
  styleUrls: ['project.css'],
  encapsulation: ViewEncapsulation.None
})
export class Project {
  tabItems = [
      {title: 'Tasks', link: ['tasks']},
      {title: 'Comments', link: ['comments']},
      {title: 'Activities', link: ['activities']}
  ];
  id: string;
  project: IProject;
  constructor(route: ActivatedRoute) {
    route.url.subscribe(() => {
      this.id = route.snapshot.params['projectId'] as string;
      const projects = (Data.default as IProject[]).slice(0, 3);
      this.project = projects.find((project) => project._id === this.id);
    });
  }

  updateTasks(tasks: ITask[]) {
    Object.assign(this.project.tasks, tasks);
    /*this.projectUpdated.next({
      title: this.project.title,
      description: this.project.description,
      tasks
    });*/
    
  }

  updateComments(comments: IComment[]) {
    /*this.projectUpdated.next({
      title: this.project.title,
      description: this.project.description,
      tasks: this.project.tasks,
      comments
    });
    */
  }

}