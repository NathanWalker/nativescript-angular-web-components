import { DynamicComponentLoader, ComponentRef, ViewContainerRef, Type } from '@angular/core';
/**
 * Wrapper component used for loading components when navigating
 * It uses DetachedContainer as selector so that it is containerRef is not attached to the visual tree.
 */
export declare class DetachedLoader {
    private loader;
    containerRef: ViewContainerRef;
    private viewLoaded;
    private pendingLoads;
    constructor(loader: DynamicComponentLoader);
    ngAfterViewInit(): void;
    private loadInLocation(componentType);
    loadComponent(componentType: Type): Promise<ComponentRef<any>>;
}
