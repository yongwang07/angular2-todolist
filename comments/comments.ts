import {Component, Inject, Input, Output, ViewEncapsulation, 
  ViewChild, EventEmitter, SimpleChange} from '@angular/core';
import {currentUser} from '../user/user-area';
import {Editor} from '../editor/editor';
import {IComment} from '../models';
import {ActivityService} from '../activities/activity-service'

interface IChanges {[key: string]: SimpleChange};
function limitWithEllipsis(str: string, limit: number) {
  if (str.length > limit) {
    return str.slice(0, limit - 1) + '…';
  } else {
    return str;
  }
}
@Component({
  selector: 'ngc-comments',
  host: {
    class: 'comments'
  },
  moduleId: module.id,
  templateUrl: 'comments.html',
  styleUrls: ['comments.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Comments {
  @Input() comments: IComment[];
  @Output() commentsUpdated = new EventEmitter();
  @ViewChild(Editor) newCommentEditor: Editor;

  constructor(private activityService: ActivityService) {}

  ngOnChanges(changes: IChanges) {
    if (changes.comments && changes.comments.currentValue === undefined) {
      this.comments = [];
    }
  }

  addNewComment() {
    const comments = this.comments.slice();
    const content = this.newCommentEditor.getEditableContent();
    comments.splice(0, 0, {
      user: currentUser,
      time: +new Date(),
      content
    });
    this.commentsUpdated.emit(comments);
    this.newCommentEditor.setEditableContent('');
    this.activityService.logActivity(
      '1234',
      'comments',
      'New comment was added',
      `A new comment "${limitWithEllipsis(content, 30)}" was added to #1234.`
    );
  }

  onCommentEdited(comment: IComment, content: string) {
    const comments = this.comments.slice();
    if (content.length === 0) {
      const removed: IComment = comments.splice(comments.indexOf(comment), 1)[0];
      this.activityService.logActivity(
        '1234',
        'comments',
        'Comment deleted',
        `The comment "${limitWithEllipsis(removed.content, 30)}" on #1234 was deleted.`
      );
    } else {
      const oldComment = comments.splice(comments.indexOf(comment), 1, {
        user: comment.user,
        time: comment.time,
        content
      })[0];
      this.activityService.logActivity(
        '1234',
        'comments',
        'Comment edited',
        `The comment "${limitWithEllipsis(oldComment.content, 30)}" on #1234 was edited.`
      );
    }
    this.commentsUpdated.emit(comments);
  }

  isNewCommentEmpty() {
    return this.newCommentEditor ? this.newCommentEditor.getEditableContent().length === 0 : true;
  }

  hasComments() {
    return this.comments && this.comments.length > 0;
  }
}