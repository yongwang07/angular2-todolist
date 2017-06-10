import {Record, List} from "immutable";
import * as moment from 'moment';

export function limitWithEllipsis(str: string, limit: number) {
  if (str.length > limit) {
    return str.slice(0, limit - 1) + '…';
  } else {
    return str;
  }
}

export class Tag {
  textTag: string;
  title: string;
  link: string;
  type: string;
  constructor(textTag: string, title: string, link: string, type: string) {
    this.textTag = textTag;
    this.title = title;
    this.link = link;
    this.type = type;
  }
}

export interface IActivity {
  user: IUser,
  time: moment.Moment,
  type: string,
  subject: string,
  category: string,
  title: string,
  message: string,
  _id?: string
}
export interface IProject {
    _id: string,
    type: string,
    deleted: boolean,
    title: string,
    description: string,
    tasks: ITask[],
    milestones: string[],
    comments: IComment[]
}
export interface ITask {
  title: string,
  done: boolean,
  nr?: number;
  efforts?: {estimated: number, effective: number}
  milestone?: string,
  description?: string,
  position?: number,
  created: number
}

export interface IUser {
    name: string;
    pictureDataUri: string;
}

export interface IComment {
  user: IUser;
  time: number;
  content: string;
}

export interface User {
  id: string;
  name: string;
  avatarSrc: string;
  isClient?: boolean;
}

const ThreadRecord  = Record({
  id : undefined,
  name: undefined,
  avatarSrc: undefined,
  messages: undefined
});

export class Thread extends ThreadRecord {
  id : string;
  name: string;
  avatarSrc: string;
  messages: List<Message>;
}

const MessageRecord = Record({
  id: undefined,
  sentAt: undefined,
  isRead: undefined,
  author: undefined,
  text: undefined,
  thread: undefined
});

export class Message extends MessageRecord {
  id: string;
  sentAt: Date;
  isRead?: boolean;
  author: User;
  text: string;
  thread?: Thread;
}