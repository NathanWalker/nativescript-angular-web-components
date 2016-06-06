import {ActionBarComponent} from './action-bar/';
import {ActionItemComponent} from './action-item/';
import {ButtonComponent} from './button/';
import {LabelComponent} from './label/';
import {ImageComponent} from './image/';
import {ListViewComponent} from './list-view/';
import {StackLayoutComponent} from './layout-containers/stack-layout/stack-layout.component';

import {SharedService} from '../shared/';

let components: any[] = [];

if (!SharedService.IS_NATIVESCRIPT()) {
  // only setup on the web
  components = [
    ActionBarComponent,
    ActionItemComponent,
    ButtonComponent,
    LabelComponent,
    ImageComponent,
    ListViewComponent,
    StackLayoutComponent
  ];
}

export const NATIVESCRIPT_WEB_COMPONENTS: any[] = components;
