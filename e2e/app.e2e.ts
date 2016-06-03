import { NativescriptAngularWebComponentsPage } from './app.po';

describe('nativescript-angular-web-components App', function() {
  let page: NativescriptAngularWebComponentsPage;

  beforeEach(() => {
    page = new NativescriptAngularWebComponentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('nativescript-angular-web-components works!');
  });
});
