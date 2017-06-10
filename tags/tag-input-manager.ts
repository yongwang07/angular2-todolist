function getRangeBoundlingClientRect() {
  if (window.getSelection) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return null;

    const range = selection.getRangeAt(0);

    if (!range.collapsed) {
      return range.getBoundingClientRect();
    }

    const dummy = document.createElement('span');
    range.insertNode(dummy);
    const pos = dummy.getBoundingClientRect();
    dummy.parentNode.removeChild(dummy);
    return pos;
  } else return null;
}

export class TagInputManager {
  textTag: string;
  position: {top: number, left: number};
  constructor() {
    this.reset();
  }

  reset() {
    this.textTag = '';
    this.position = null;
  }

  hasTextTag() {
    return this.textTag[0] === '#';
  }

  updateTextTag(textTag: string, position = this.position) {
    this.textTag = textTag;
    this.position = position;
  }

  onKeyDown(event: MouseEvent) {
    if (event.which === 8 && this.hasTextTag()) {
      this.updateTextTag(this.textTag.slice(0, -1));
    }
  }

  onKeyPress(event: MouseEvent) {
    const char = String.fromCharCode(event.which);
    if (char === '#') {
      this.updateTextTag('#', getRangeBoundlingClientRect());
    } else if ((/[\w-]/i).test(this.textTag[0])) {
      this.reset();
    } else if (this.hasTextTag()) {
      this.updateTextTag(this.textTag + char);
    }
  }
}