import { Component, OnInit, Input, ViewChild, ViewContainerRef, ContentChild, TemplateRef, ElementRef, IterableDiffer, IterableDiffers, ChangeDetectorRef, EmbeddedViewRef, Output, EventEmitter } from '@angular/core';
import {isListLikeIterable} from '@angular/core/src/facade/collection';
const NG_VIEW = "_ngViewRef";

export class ListItemContext {
    constructor(
        public $implicit?: any,
        public item?: any,
        public index?: number,
        public even?: boolean,
        public odd?: boolean
    ) {
    }
}

export interface SetupItemViewArgs {
    view: EmbeddedViewRef<any>;
    data: any;
    index: number;
}

@Component({
  moduleId: module.id,
  selector: 'ListView',
  templateUrl: 'list-view.component.html',
  styleUrls: ['list-view.component.css']
})
export class ListViewComponent implements OnInit {
  @ViewChild('loader', { read: ViewContainerRef }) loader: ViewContainerRef;
  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

  private listView: any;  
  private _items: any;
  private _differ: IterableDiffer;

  @Output() public setupItemView: EventEmitter<SetupItemViewArgs> = new EventEmitter<SetupItemViewArgs>();
  
  constructor(private el: ElementRef, private _iterableDiffers: IterableDiffers, private _cdr: ChangeDetectorRef) {
    this.listView = el.nativeElement;
  }

  @Input() set items(value: any) {
    this._items = value;
    var needDiffer = true;
    if (value instanceof Array) {
        needDiffer = false;
    }
    if (needDiffer && !this._differ && isListLikeIterable(value)) {
        this._differ = this._iterableDiffers.find(this._items).create(this._cdr, (index, item) => { return item;});
    }
    this.listView.items = this._items;

    if (this._items && this._items.length) {
      for (let i = 0; i < this._items.length; i++) {
        this.onItemLoading({ index: i });
      }
    }
  } 

  public onItemLoading(args) {
        if (!this.itemTemplate) {
            return;
        }

        let index = args.index;
        let items = this._items;
        let currentItem = typeof (items.getItem) === "function" ? items.getItem(index) : items[index];
        let viewRef: EmbeddedViewRef<ListItemContext>;

        if (args.view) {
            // console.log("ListView.onItemLoading: " + index + " - Reusing existing view");
            viewRef = args.view[NG_VIEW];
        }
        else {
            // console.log("ListView.onItemLoading: " + index + " - Creating view from template");
            viewRef = this.loader.createEmbeddedView(this.itemTemplate, new ListItemContext(), 0);
            args.view = getSingleViewFromViewRef(viewRef);
            args.view[NG_VIEW] = viewRef;
        }
        this.setupViewRef(viewRef, currentItem, index);
    }

  public setupViewRef(viewRef: EmbeddedViewRef<ListItemContext>, data: any, index: number): void {
        const context = viewRef.context;
        context.$implicit = data;
        context.item = data;
        context.index = index;
        context.even = (index % 2 == 0);
        context.odd = !context.even;

        this.setupItemView.next({view: viewRef, data: data, index: index, context: context});
  }
  
  
  ngOnInit() {
  }

}

function getSingleViewFromViewRef(viewRef: EmbeddedViewRef<any>): any {
    var getSingleViewRecursive = (nodes: Array<any>, nestLevel: number) => {
        var actualNodes = nodes.filter((n) => !!n && n.nodeName !== "#text");

        if (actualNodes.length === 0) {
            throw new Error("No suitable views found in list template! Nesting level: " + nestLevel);
        }
        else if (actualNodes.length > 1) {
            throw new Error("More than one view found in list template! Nesting level: " + nestLevel);
        }
        else {
            if (actualNodes[0]) {
                let parentLayout = actualNodes[0].parent;
                // if (parentLayout instanceof LayoutBase) {
                //     parentLayout.removeChild(actualNodes[0]);
                // }
                return actualNodes[0];
            }
            else {
                return getSingleViewRecursive(actualNodes[0].children, nestLevel + 1)
            }
        }
    }

    return getSingleViewRecursive(viewRef.rootNodes, 0);
}
