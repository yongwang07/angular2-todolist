import {Component, ViewEncapsulation, Input, Inject, 
    ElementRef, HostListener, Output, EventEmitter, SimpleChange} from '@angular/core';
import {CalendarTimePipe} from '../pipes/calendar-time';
import {IActivity} from '../models';

@Component({
  selector: 'ngc-activity-slider',
  host: {
    class: 'activity-slider'
  },
  moduleId: module.id,
  templateUrl: 'activity-slider.html',
  styleUrls: ['activity-slider.css'],
  encapsulation: ViewEncapsulation.Native,
})
export class ActivitySlider {
    @Input() activities: IActivity[];
    @Output() selectionChange = new EventEmitter();
    sliderElement: any;
    padding: number;
    timeFirst: number;
    timeLast: number;
    timeSpan: number;
    ticks: number[];
    modifySelection: boolean;
    selection: {start: number, end: number};
    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        this.sliderElement = elementRef.nativeElement;
        this.padding = 20;
    }

    ngOnChanges(changes:{[key: string]: SimpleChange}) {
    if (changes.activities && changes.activities.currentValue) {
      const activities = changes.activities.currentValue;
      if (activities.length === 1) {
        this.timeFirst = this.timeLast = activities[0].time;
      } else if (activities.length > 1) {
        this.timeFirst = activities[activities.length - 1].time;
        this.timeLast = activities[0].time;
      } else {
        this.timeFirst = this.timeLast = new Date().getTime();
      }

      this.timeSpan = Math.max(1, this.timeLast - this.timeFirst);
      this.computeTicks();
      this.selection = {
        start: this.timeFirst,
        end: this.timeLast
      };
      this.selectionChange.next(this.selection);
    }
  }

  computeTicks() {
    const count = 5;
    const timeSpanTick = this.timeSpan / count;
    this.ticks = Array.from({length: count}).map((element, index) => {
      return this.timeFirst + timeSpanTick * index;
    });
  }

  totalWidth() {
    return this.sliderElement.clientWidth - this.padding * 2;
  }

  projectTime(time: number) {
    let position = this.padding +
      (time - this.timeFirst) / this.timeSpan * this.totalWidth();
    return position / this.sliderElement.clientWidth * 100;
  }

  projectLength(length: number) {
    return this.timeFirst + (length - this.padding) / this.totalWidth() * this.timeSpan;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.selection.start = this.selection.end = this.projectLength(event.offsetX);
    this.selectionChange.next(this.selection);
    this.modifySelection = true;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.modifySelection) {
      this.selection.end = Math.max(this.selection.start, this.projectLength(event.offsetX));
      this.selectionChange.next(this.selection);
      event.stopPropagation();
      event.preventDefault();
    }
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.modifySelection = false;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.modifySelection = false;
  }

  @HostListener('dblclick', ['$event'])
  onDoubleClick(event: MouseEvent) {
    this.selection = {
      start: this.timeFirst,
      end: this.timeLast
    };
    this.selectionChange.next(this.selection);
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
  }
}