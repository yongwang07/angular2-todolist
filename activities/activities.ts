import {Component, ViewEncapsulation, Inject, Input, SimpleChange, OnChanges} from '@angular/core';
import {ActivityService} from './activity-service';
import {ActivitySlider} from '../activity-slider/activity-slider';
import {Activity} from './activity';
import {Project} from '../project/project';
import {IActivity} from '../models';
import {Subscription} from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
  selector: 'ngc-activities',
  host: {
    class: 'activities'
  },
  moduleId: module.id,
  templateUrl: 'activities.html',
  styleUrls: ['activities.css'],
  encapsulation: ViewEncapsulation.None
})
export class Activities implements OnChanges {
  @Input() activitySubject: Project;
  activities: IActivity[];
  selectedActivities: IActivity[];
  activitiesChangeSubscription: Subscription;
  selection: {start: moment.Moment, end: moment.Moment};
  constructor(private activityService: ActivityService) {
    this.activityService = activityService;
  }

  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    if (changes.activitySubject) {
      if (this.activitiesChangeSubscription) {
        this.activitiesChangeSubscription.unsubscribe();
      }
      this.activitiesChangeSubscription = this.activityService.change.subscribe((activities) => {
        this.activities = activities
          .filter((activity) => activity.subject === this.activitySubject.id);
        this.onSelectionChange();
      });
    }
  }

  onSelectionChange(selection = this.selection) {
    this.selection = selection;
    this.selectedActivities = this.selection ? this.activities.filter(
      (activity: IActivity) => activity.time >= this.selection.start && activity.time <= this.selection.end
    ) : this.activities;
  }

  getAlignment(index: number) {
    return index % 2 === 0 ? 'left' : 'right';
  }

  isFirst(index: number) {
    return index === 0;
  }

  isLast(index: number) {
    return index === this.selectedActivities.length - 1;
  }

}