import 'globals';
import "zone.js/dist/zone-node";
import 'reflect-metadata';
import './polyfills/array';
import { Type } from '@angular/core/src/facade/lang';
import { ComponentRef } from '@angular/core';
import { Provider } from '@angular/core/src/di';
export declare type ProviderArray = Array<Type | Provider | any[]>;
export interface AppOptions {
    cssFile?: string;
    startPageActionBarHidden?: boolean;
}
export declare function bootstrap(appComponentType: any, customProviders?: ProviderArray): Promise<ComponentRef<any>>;
export declare function nativeScriptBootstrap(appComponentType: any, customProviders?: ProviderArray, appOptions?: AppOptions): Promise<ComponentRef<any>>;
