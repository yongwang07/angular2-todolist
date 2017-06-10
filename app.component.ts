import {Component, ViewEncapsulation} from '@angular/core';
import {Config} from './shared/config/env.config';
import {AppState} from './reducers';
import {Store} from '@ngrx/store';
import {IProject} from './models';
import * as Data from './initial-data';

@Component({
  moduleId: module.id,
  selector: 'ngc-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  projects: IProject[];
  openTasksCount: number;
  projectNavigationItems: any;
  selectedProject: IProject;

  constructor(private store: Store<AppState>) {
      console.log('Environment config', Config);
      this.projects = (Data.default as IProject[]).slice(0, 3);
      this.projectNavigationItems = this.projects
          .filter((project) => !project.deleted)
          .map((project) => {
            return {
              title: project.title,
              link: ['/projects', project._id]
          }});
      
      this.openTasksCount = this.projects
          .reduce((count, project) => count + project.tasks.filter((task) => !task.done).length, 0);
  }
}