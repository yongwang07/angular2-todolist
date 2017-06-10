import {Component, ViewEncapsulation, Inject} from '@angular/core';
import * as Data from '../initial-data';
import {IProject} from '../models';

@Component({
  selector: 'ngc-projects-dashboard',
  host: {
    class: 'projects-dashboard'
  },
  moduleId: module.id,
  templateUrl: 'project-dashboard.html',
  styleUrls: ['project-dashboard.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsDashboard {
    projects: IProject[];
    constructor() {
      this.projects = (Data.default as IProject[]).slice(0, 3);
    }
}