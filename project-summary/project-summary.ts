import {Component, ViewEncapsulation, Input, Inject, OnChanges} from '@angular/core';
import {ActivityService} from '../activities/activity-service';
import {IProject, IActivity} from '../models';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'ngc-project-summary',
  host: {
    class: 'project-summary'
  },
  moduleId: module.id,
  templateUrl: 'project-summary.html',
  styleUrls: ['project-summary.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectSummary implements OnChanges {
  @Input() project: IProject;
  totalEfforts: {estimated: number, effective: number};
  activities: Observable<IActivity[]>;
  constructor(private activityService: ActivityService) {
    this.activityService = activityService;
  }

  ngOnChanges() {
    if (this.project) {
      this.totalEfforts = this.project.tasks.reduce((totalEfforts, task) => {
        if (task.efforts) {
          totalEfforts.estimated += task.efforts.estimated || 0;
          totalEfforts.effective += task.efforts.effective || 0;
        }
        return totalEfforts;
      }, {
        estimated: 0,
        effective: 0
      });
      this.activities = this.activityService.change
          .map((activities) => activities.filter((activity) => activity.subject === this.project._id));
    }
  }
}