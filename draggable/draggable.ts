import {Directive, HostListener, Input, HostBinding} from '@angular/core';
import {ITask} from '../models';
@Directive({
  selector: '[draggable]',
  host: {
    class: 'draggable',
    draggable: 'true'
  }
})
export class Draggable {
  @Input() draggableData: ITask;
  @Input() draggableType: string;
  @HostBinding('class.draggable--dragging') dragging: boolean;

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/json', JSON.stringify(this.draggableData));
    event.dataTransfer.setData(`draggable-type:${this.draggableType}`, '');
    this.dragging = true;
  }

  @HostListener('dragend')
  onDragEnd() {
    this.dragging = false;
  }
}