import {Component, ViewChild, Input, Output, ViewEncapsulation, 
    EventEmitter, HostBinding, HostListener, ElementRef, OnChanges, AfterViewInit} from '@angular/core';
import {TagInputManager} from '../tags/tag-input-manager';
import {Tag} from '../models';

@Component({
  selector: 'ngc-editor',
  host: {
    class: 'editor'
  },
  moduleId: module.id,
  templateUrl: 'editor.html',
  styleUrls: ['editor.css'],
  encapsulation: ViewEncapsulation.None
})
export class Editor implements OnChanges, AfterViewInit {
  @ViewChild('editableContentElement') editableContentElement: ElementRef;
  @Input() content: string;
  @Input() @HostBinding('class.editor--edit-mode') editMode: boolean;
  @Input() showControls: boolean;
  @Input() enableTags: boolean;
  @Output() editSaved = new EventEmitter();
  @Output() editCanceled = new EventEmitter();
  @Output() editableInput = new EventEmitter();
  @Output() editModeChange = new EventEmitter();

  tagInputManager = new TagInputManager();

  ngOnChanges() {
    if (this.editableContentElement && this.content) {
      this.setEditableContent(this.content);
    }
  }

  ngAfterViewInit() {
    this.setEditableContent(this.content);
  }

  getEditableContent() {
    return this.editableContentElement.nativeElement.textContent;
  }

  setEditableContent(content: string) {
    this.editableContentElement.nativeElement.textContent = content;
  }

  switchEditMode(editMode: boolean) {
    this.editMode = editMode;
    this.editModeChange.next(editMode);
  }

  @HostListener('click')
  focusEditableContent() {
    if (this.editMode) {
      this.editableContentElement.nativeElement.focus();
    }
  }

  onInput() {
    this.editableInput.emit(this.getEditableContent());
  }
  
  onKeyDown(event: MouseEvent) {
    this.tagInputManager.onKeyDown(event);
  }

  onKeyPress(event: MouseEvent) {
    this.tagInputManager.onKeyPress(event);
  }

  onTagSelected(tag: Tag) {
    this.setEditableContent(this.getEditableContent().replace(this.tagInputManager.textTag, tag.textTag));
    this.tagInputManager.reset();
  }

  save() {
    this.editSaved.emit(this.getEditableContent());
    this.setEditableContent(this.content);
    this.switchEditMode(false);
    this.tagInputManager.reset();
  }

  cancel() {
    this.setEditableContent(this.content);
    this.editCanceled.emit(this.content);
    this.editableInput.emit(this.getEditableContent());
    this.switchEditMode(false);
    this.tagInputManager.reset();
  }

  edit() {
    this.switchEditMode(true);
  }
}