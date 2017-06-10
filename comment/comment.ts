import {Component, Input, Output, ViewEncapsulation, EventEmitter} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {IUser} from '../models';
import {IComment} from '../models';

@Component({
  selector: 'ngc-comment',
  host: {
    class: 'comment'
  },
  moduleId: module.id,
  templateUrl: 'comment.html',
  styleUrls: ['comment.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Comment {
  @Input() comment: IComment;
  @Output() commentEdited = new EventEmitter();
  
  constructor( private ds: DomSanitizer){}

  sanitize(url:string){
    return this.ds.bypassSecurityTrustUrl(url);
  }
  onContentSaved(content: any) {
    this.commentEdited.emit(content);
  }
}