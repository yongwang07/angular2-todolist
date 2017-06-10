import {Input, Inject, Directive, ChangeDetectorRef, 
    IterableDiffer, IterableDiffers, ViewContainerRef, 
    TemplateRef, EmbeddedViewRef} from '@angular/core';
import {ITask} from '../models';

function findScrollableParent(element: HTMLElement) {
    while (element != document.documentElement) {
        if (getComputedStyle(element).overflowY !== 'visible') {
            break;
        }
        element = element.parentElement;
    }
    return element;
}

function isScrolledBottom(element: HTMLElement) {
    return element.scrollHeight - element.scrollTop === element.clientHeight
}

@Directive({
  selector: '[ngcInfiniteScroll]'
})
export class InfiniteScroll {
    shownItemCount: number;
    increment: number;
    scrollableElement: HTMLElement;
    _onScrollListener: any;
    infiniteScrollOf: ITask[];
    differ: IterableDiffer;
    constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private iterableDiffers: IterableDiffers,
              private cdr: ChangeDetectorRef) {
        Object.assign(this, {viewContainerRef, templateRef, iterableDiffers, cdr});
        this.shownItemCount = 3;
        this.increment = 3;
    }

    ngOnInit() {
        this.scrollableElement = findScrollableParent(this.viewContainerRef.element.nativeElement.parentElement);
        this._onScrollListener = this.onScroll.bind(this);
        this.scrollableElement.addEventListener('scroll', this._onScrollListener);
    }

    @Input('ngcInfiniteScrollOf')
    set infiniteScrollOfSetter(value: ITask[]) {
        this.infiniteScrollOf = value;
        if (value && !this.differ) {
            this.differ = this.iterableDiffers.find(value).create(this.cdr);
        }
    }

    onScroll() {
        if (this.scrollableElement && isScrolledBottom(this.scrollableElement)) {
            this.shownItemCount = Math.min(this.infiniteScrollOf.length, this.shownItemCount + this.increment);
            this.cdr.markForCheck();
        }
    }
    
    ngDoCheck() {
        if (this.differ) {
            const updatedList = this.infiniteScrollOf.slice(0, this.shownItemCount);
            const changes = this.differ.diff(updatedList);
            if (changes) {
                this.applyChanges(changes);
                this.onScroll();
            }
        }
    }
    
    applyChanges(changes: any) {
        const recordViewTuples:any = [];
        changes.forEachRemovedItem((removedRecord: any) => recordViewTuples.push({record: removedRecord}));
        changes.forEachMovedItem((movedRecord: any) => recordViewTuples.push({record: movedRecord}));

        const insertTuples = this.bulkRemove(recordViewTuples);
        changes.forEachAddedItem((addedRecord: any) => insertTuples.push({record: addedRecord}));

        this.bulkInsert(insertTuples).forEach((tuple: any) => tuple.view.context.$implicit = tuple.record.item);
    }

    bulkRemove(tuples: any) {
        tuples.sort((a: any, b: any) => a.record.previousIndex - b.record.previousIndex);
        return tuples.reduceRight((movedTuples: any, tuple: any) => {
            if (tuple.record.currentIndex != null) {
                tuple.view = this.viewContainerRef.detach(tuple.record.previousIndex);
                movedTuples.push(tuple);
            } else {
                this.viewContainerRef.remove(tuple.record.previousIndex);
            }
            return movedTuples;
        }, []);
    }

    bulkInsert(tuples: any) {
        tuples.sort((a: any, b: any) => a.record.currentIndex - b.record.currentIndex);
        tuples.forEach((tuple: any) => {
            if (tuple.view) {
                this.viewContainerRef.insert(tuple.view, tuple.record.currentIndex);
            } else {
                tuple.view = this.viewContainerRef.createEmbeddedView(this.templateRef, {}, tuple.record.currentIndex);
            }
        });
        return tuples;
    }
    
    ngOnDestroy() {
        this.scrollableElement.removeEventListener('scroll', this._onScrollListener);
    }
}