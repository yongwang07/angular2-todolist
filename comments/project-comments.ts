import {Component, ViewEncapsulation, Inject, forwardRef} from '@angular/core';
import {IComment} from '../models';
import {Project} from '../project/project';

@Component({
  selector: 'ngc-project-comments',
  template: `<ngc-comments [comments]="project.project.comments"
              (commentsUpdated)="updateComments($event)"></ngc-comments>`,
  encapsulation: ViewEncapsulation.None
})

export class ProjectComments {
    project: Project;
  constructor(@Inject(forwardRef(() => Project)) project: Project) {
    this.project = project;
  }

  updateComments(comments: IComment[]) {
    this.project.project.comments = comments;
    this.project.updateComments(comments);
  }
}