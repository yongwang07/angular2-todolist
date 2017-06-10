import {Tag, limitWithEllipsis, IProject} from '../models';
export const TAG_TYPE_PROJECT = 'project';
export const TAG_TYPE_TASK = 'task';

export function generateTag(subject: IProject): Tag {
  if (subject.type === TAG_TYPE_PROJECT) {
    const openTaskCount = subject.tasks.filter((task) => !task.done).length;
    return new Tag(
      `#${subject._id}`,
      `${limitWithEllipsis(subject.title, 20)} (${openTaskCount} open tasks)`,
      `#/projects/${subject._id}/tasks`,
      TAG_TYPE_PROJECT
    );
  } /*else if (subject.type === TAG_TYPE_TASK) {
    return new Tag(
      `#${subject._id}-task-${subject.task.nr}`,
      `${limitWithEllipsis(subject.task.title, 20)} (${subject.task.done ? 'done' : 'open'})`,
      `#/projects/${subject.project._id}/task/${subject.task.nr}`,
      TAG_TYPE_TASK
    );
  }*/ else return null;
}