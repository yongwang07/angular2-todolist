import {Component, ViewEncapsulation, ViewChild, Query, 
    OnChanges, ElementRef, Input} from '@angular/core';
import * as Chartist from 'chartist';
import * as moment from 'moment';
import {rasterize} from '../utils/time-utility';
import {IProject} from '../models';

interface ITimeFrame {
    name: string, 
    timeFrame: number, 
    amount: number
}

@Component({
  selector: 'ngc-tasks-chart',
  host: {
    class: 'tasks-chart'
  },
  moduleId: module.id,
  templateUrl: 'task-chart.html',
  styleUrls: ['task-chart.css'],
  encapsulation: ViewEncapsulation.None
})

export class TasksChart implements OnChanges {
  @Input() projects: IProject[];
  @ViewChild('chartContainer') chartContainer: ElementRef;
  timeFrames: ITimeFrame[];
  timeFrameNames: string[];
  selectedTimeFrame: ITimeFrame;
  legend: {name: string, class: string}[];
  chart: any;
  constructor() {
    this.timeFrames = [{
      name: 'day',
      timeFrame: 600000,
      amount: 144
    }, {
      name: 'week',
      timeFrame: 3600000,
      amount: 168
    }, {
      name: 'year',
      timeFrame: 86400000,
      amount: 360
    }];
    this.timeFrameNames = this.timeFrames.map((timeFrame) => timeFrame.name);
    this.selectedTimeFrame = this.timeFrames[0];
  }

  ngOnChanges() {
    if (this.projects) {
      this.legend = this.projects.map((project, index) => {
        return {
          name: project.title,
          class: `tasks-chart__series--series-${index + 1}`
        };
      });
    }

    this.createOrUpdateChart();
  }

  ngAfterViewInit() {
    this.createOrUpdateChart();
  }

  onSelectedTimeFrameChange(timeFrameName: string) {
    this.selectedTimeFrame = this.timeFrames.find((timeFrame) => timeFrame.name === timeFrameName);
    this.createOrUpdateChart();
  }

  createOrUpdateChart() {
    if (!this.projects || !this.chartContainer) {
      return;
    }

    const series = this.projects.map((project) => {
      const timeData = project.tasks.reduce((timeData, task) => {
        timeData.push({
          time: task.created,
          weight: 1
        });
        if (task.done) {
          timeData.push({
            time: task.done,
            weight: -1
          });
        }
        return timeData;
      }, []);
      return rasterize(timeData, this.selectedTimeFrame.timeFrame, this.selectedTimeFrame.amount, +new Date(), null, true);
    });

    const now = +new Date();
    const labels = Array.from({
      length: this.selectedTimeFrame.amount
    }).map((e, index) => now - index * this.selectedTimeFrame.timeFrame).reverse();

    if (this.chart) {
      this.chart.update({
        series,
        labels
      });
    } else {
      this.chart = new Chartist.Line(this.chartContainer.nativeElement, {
        series,
        labels
      }, {
        width: '100%',
        height: 300,
        lineSmooth: Chartist.Interpolation.step({
          fillHoles: true
        }),
        axisY: {
          onlyInteger: true,
          low: 0,
          offset: 70,
          labelInterpolationFnc: (value: string) => `${value} tasks`
        },
        axisX: {
          labelInterpolationFnc: (value: number, index: number, array: string[]) => index % Math.floor(this.selectedTimeFrame.amount / 2) === 0 ? moment(value).calendar() : null
        }
      }, [
        ['screen and (min-width: 1200px)', {
          axisX: {
            labelInterpolationFnc: (value: number, index: number) => index % Math.floor(this.selectedTimeFrame.amount / 4) === 0 ? moment(value).calendar() : null
          }
        }], ['screen and (min-width: 1500px)', {
          axisX: {
            labelInterpolationFnc: (value: number, index: number) => index % Math.floor(this.selectedTimeFrame.amount / 6) === 0 ? moment(value).calendar() : null
          }
        }]
      ]);
    }
  }
}