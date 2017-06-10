import { NgModule, } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, Route, RouterModule } from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {StoreModule} from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {reducers} from './reducers/index';
import {TaskList} from './task-list/task-list';
import {Task} from './task/task';
import {Checkbox} from './checkbox/checkbox';
import {EnterTask} from './enter-task/enter-task';
import {Toggle} from './toggle/toggle';
import {Project} from './project/project';
import {Tab} from './tabs/tab'
import {Tabs} from './tabs/tabs'
import {Navigation} from './navigation/navigation';
import {NavigationItem} from './navigation/navigation-item';
import {NavigationSection} from './navigation/navigation-section';
import {UserArea} from './user/user-area';
import {FromNowPipe} from './pipes/from-now';
import {Editor} from './editor/editor';
import {Comment} from './comment/comment';
import {Comments} from './comments/comments';
import {ProjectComments} from './comments/project-comments';
import {ProjectTaskList} from './task-list/project-task-list';
import {ActivityService} from './activities/activity-service';
import {ActivitySlider} from './activity-slider/activity-slider';
import {CalendarTimePipe} from './pipes/calendar-time';
import {Activity} from './activities/activity';
import {ProjectActivities} from './project-activities/project-activities';
import {Activities} from './activities/activities';
import {TagsService} from './tags/tags-service';
import {TagsPipe} from './pipes/tags';
import {TagsSelect} from './tags-select/tags-select';
import {Draggable} from './draggable/draggable';
import {DraggableDropZone} from './draggable/draggable-drop-zone';
import {InfiniteScroll} from './infinite-scroll/infinite-scroll';
import {AutoComplete} from './auto-complete/auto-complete';
import {ProjectTaskDetails} from './project-task-detail/project-task-detail';
import {FormatDurationPipe} from './pipes/format-duration';
import {Duration} from './duration/duration';
import {EffortsTimeline} from './efforts/effort-timeline';
import {Efforts} from './efforts/efforts';
import {LimitWithEllipsisPipe} from './pipes/limit-with-ellipsis';
import {ProjectSummary} from './project-summary/project-summary';
import {FormatEffortsPipe} from './pipes/format-efforts';
import {ProjectsDashboard} from './project-dashboard/project-dashboard';
import {TasksChart} from './task-chart/task-chart';
import {ActivityChart} from './activity-chart/activity-chart';
const rootRouterConfig: Routes = [{
    path: 'dashboard', 
    component: ProjectsDashboard
    },{
    path: "projects/:projectId",
    component: Project,
    children:[{
      path:'',
      redirectTo:'tasks',
      pathMatch:'full'
    },
    {
      path: 'tasks',
      component: ProjectTaskList
    },{
      path: 'tasks/:nr',
      component: ProjectTaskDetails
    },{
      path: 'comments',
      component: ProjectComments
    }, {
      path: 'activities',
      component: ProjectActivities
    }]
  }];
@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(rootRouterConfig), 
  FormsModule, StoreModule.provideStore(reducers),
  StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
  })],
  declarations: [AppComponent, TaskList, Task, Checkbox, EnterTask, Toggle,
  Project, Tab, Tabs, Navigation, NavigationItem, NavigationSection, UserArea, 
  FromNowPipe, Editor, Comment, Comments, ProjectTaskList, ProjectComments, 
  ActivitySlider, CalendarTimePipe, TagsPipe, Activity, ProjectActivities, 
  Activities, TagsSelect, Draggable, DraggableDropZone, InfiniteScroll, AutoComplete,
  ProjectTaskDetails, FormatDurationPipe, Duration, EffortsTimeline, Efforts, LimitWithEllipsisPipe,
  ProjectSummary, FormatEffortsPipe, ProjectsDashboard, TasksChart, ActivityChart],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }, {provide: LocationStrategy, useClass: HashLocationStrategy}, ActivityService, TagsService],
  bootstrap: [AppComponent]
})
export class AppModule { }