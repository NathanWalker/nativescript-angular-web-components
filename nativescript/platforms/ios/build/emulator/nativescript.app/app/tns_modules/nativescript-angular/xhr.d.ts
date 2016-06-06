import { XHR } from "@angular/compiler/src/xhr";
export declare class FileSystemXHR extends XHR {
    get(url: string): Promise<string>;
}
