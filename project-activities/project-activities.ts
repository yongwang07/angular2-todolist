import {Component, ViewEncapsulation, Inject, forwardRef} from '@angular/core';
import {Project} from '../project/project';

@Component({
  selector: 'ngc-project-activities',
  template: '<ngc-activities [activitySubject]="project"></ngc-activities>',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectActivities {
    project: Project;
    constructor(@Inject(forwardRef(() => Project)) project: Project) {
        this.project = project;
    }
}