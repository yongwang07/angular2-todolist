import {Injectable, Inject} from '@angular/core';
import {ReplaySubject} from 'rxjs/Rx';
import {currentUser} from '../user/user-area';
import {IActivity, IProject} from '../models';
import * as Data from '../initial-data';
import * as moment from 'moment';

@Injectable()
export class ActivityService {
    change: ReplaySubject<IActivity[]>;
    activities: IActivity[];
    constructor() {
        this.change = new ReplaySubject(1);
        this.activities = <IActivity[]>Data.default.slice().filter(project => project.type === 'activity');
        this.activities.sort((a, b) => a.time > b.time ? -1 : a.time < b.time ? 1 : 0);
        this.change.next(this.activities);
    }
    
    logActivity(subject: string, category: string, title: string, message: string) {
        this.activities.push({
            type: 'activity',
            user: currentUser,
            time: moment(new Date()),
            subject,
            category,
            title,
            message
        });

  }
}