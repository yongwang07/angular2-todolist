import {Directive, HostListener, Input, HostBinding, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[draggableDropZone]'
})
export class DraggableDropZone {
  @Input() dropAcceptType: string;
  @Output() dropDraggable = new EventEmitter();
  @HostBinding('class.draggable--over') over: boolean;
  dragEnterCount: number;
  constructor() {
    this.dragEnterCount = 0;
  }

  typeIsAccepted(event: DragEvent) {
    const draggableType = Array.from(event.dataTransfer.types).find((key) =>
      key.indexOf('draggable-type') === 0);
    return draggableType && draggableType.split(':')[1] === this.dropAcceptType;
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    if (this.typeIsAccepted(event)) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    if (this.typeIsAccepted(event)) {
      const data = JSON.parse(event.dataTransfer.getData('application/json'));
      this.over = false;
      this.dragEnterCount = 0;
      this.dropDraggable.emit(data);
    }
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(event: DragEvent) {
    if (this.typeIsAccepted(event)) {
      this.over = true;
      this.dragEnterCount++;
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    if (this.typeIsAccepted(event) && --this.dragEnterCount === 0) {
      this.over = false;
    }
  }
}