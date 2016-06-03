import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { NativescriptAngularWebComponentsAppComponent } from '../app/nativescript-angular-web-components.component';

beforeEachProviders(() => [NativescriptAngularWebComponentsAppComponent]);

describe('App: NativescriptAngularWebComponents', () => {
  it('should create the app',
      inject([NativescriptAngularWebComponentsAppComponent], (app: NativescriptAngularWebComponentsAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'nativescript-angular-web-components works!\'',
      inject([NativescriptAngularWebComponentsAppComponent], (app: NativescriptAngularWebComponentsAppComponent) => {
    expect(app.title).toEqual('nativescript-angular-web-components works!');
  }));
});
