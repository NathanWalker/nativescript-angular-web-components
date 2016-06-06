import { ElementRef, ViewContainerRef, TemplateRef, EmbeddedViewRef, IterableDiffers, ChangeDetectorRef, EventEmitter } from '@angular/core';
export declare class ListItemContext {
    $implicit: any;
    item: any;
    index: number;
    even: boolean;
    odd: boolean;
    constructor($implicit?: any, item?: any, index?: number, even?: boolean, odd?: boolean);
}
export interface SetupItemViewArgs {
    view: EmbeddedViewRef<any>;
    data: any;
    index: number;
}
export declare class ListViewComponent {
    private _elementRef;
    private _iterableDiffers;
    private _cdr;
    private listView;
    private _items;
    private _differ;
    loader: ViewContainerRef;
    setupItemView: EventEmitter<SetupItemViewArgs>;
    itemTemplate: TemplateRef<ListItemContext>;
    items: any;
    private timerId;
    private doCheckDelay;
    constructor(_elementRef: ElementRef, _iterableDiffers: IterableDiffers, _cdr: ChangeDetectorRef);
    onItemLoading(args: any): void;
    setupViewRef(viewRef: EmbeddedViewRef<ListItemContext>, data: any, index: number): void;
    ngDoCheck(): void;
}
