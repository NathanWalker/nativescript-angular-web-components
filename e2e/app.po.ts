export class NativescriptAngularWebComponentsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('nativescript-angular-web-components-app h1')).getText();
  }
}
