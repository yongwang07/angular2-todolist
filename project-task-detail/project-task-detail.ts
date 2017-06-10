import {Component, ViewEncapsulation, Inject, forwardRef} from '@angular/core';
import {Project} from '../project/project';
import {Editor} from '../editor/editor';
import {ActivatedRoute } from '@angular/router';
import * as Data from '../initial-data';
import {IProject, ITask} from '../models';

@Component({
  selector: 'ngc-project-task-details',
  host: {
    class: 'task-details'
  },
  moduleId: module.id,
  templateUrl: 'project-task-detail.html',
  styleUrls: ['project-task-detail.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectTaskDetails {
  project: Project;
  tasks: ITask[];
  task: ITask;
  projectMilestones: string[];
  constructor(@Inject(forwardRef(() => Project)) project: Project, 
              private route: ActivatedRoute) {
    this.project = project;
    const taskNr: number = route.snapshot.params['nr'];
    const projects: IProject[] = (Data.default as IProject[]).slice(0, 3);
    this.tasks = projects[0].tasks;
    this.task = this.tasks[taskNr];
    this.projectMilestones = projects[0].milestones || [];
  }

  onTitleSaved(title: string) {
    this.task.title = title;
  }

  onDescriptionSaved(description: string) {
    this.task.description = description;
  }

  onEffortsChange(efforts: {estimated: number, effective: number}) {
    if (!efforts.estimated && !efforts.effective) {
      this.task.efforts = null;
    } else {
      this.task.efforts = efforts;
    }
  }

  onMilestoneSelected(milestone: string) {
    this.task.milestone = milestone;
  }

  onMilestoneCreated(milestone: string) {
    this.projectMilestones = this.projectMilestones || [];
    this.projectMilestones.push(milestone);
    this.project.project.milestones = this.project.project.milestones || [];
    this.project.project.milestones.push(milestone);
    this.task.milestone = milestone;
  }
}