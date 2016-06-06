import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NATIVESCRIPT_WEB_COMPONENTS } from './components/index';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css'],
  directives: [NATIVESCRIPT_WEB_COMPONENTS]
})
export class AppComponent {
  public title: string;
  public actionTxt: string = 'Right';
  public imgSrc: string = '~/jamiroquai1.jpg';
  public userHeading: string;
  public toggleText: string;
  public users: Array<any>;
  private origTitle: string = 'NativeScript Angular Web Components';
  private origToggleText: string = 'What is this?';
  private origUserHeading: string = 'Jury of reasonable minded folk';

  constructor(private http: Http) {
    this.title = this.origTitle;
    this.toggleText = this.origToggleText;
    this.userHeading = this.origUserHeading + ' (Loading...):';
    this.loadUsers();
  }  
  
  public leftAction() {
    alert('Left ActionItem clicked!');
  }

  public rightAction() {
    alert('Right ActionItem clicked!');
  }

  public changeText() {
    if (this.title.indexOf('Native') > -1) {
      this.title = `Using {N} View Components to render Web Components is surely "Futures made of virtual insanity ..." isn't it?`;
      this.toggleText = 'Take me back to reality';
      this.imgSrc = `~/jamiroquai2.jpg`;
      this.userHeading = 'Jury of virtually insane folk (Loading...):';
      this.loadUsers();
    } else {
      this.title = this.origTitle;
      this.toggleText = this.origToggleText;
      this.imgSrc = `~/jamiroquai1.jpg`;
      this.userHeading = this.origUserHeading + ' (Loading...):';
      this.loadUsers();
    }
  }

  public onLoaded(e: any) {
    console.log(`onLoaded`);
    console.log(e);
  }

  public onItemLoading(e: any) {
    console.log(`onItemLoading`);
    console.log(e);
  }

  public onItemTap(e: any) {
    console.log(`onItemTap`);
    console.log(e);
  }

  private loadUsers() {
    this.http.get(`https://randomuser.me/api/?results=100&nat=us&seed=${Math.floor(Math.random()*100000000)}`).map(res => res.json()).subscribe((response: any) => {
      this.users = response.results;
      this.userHeading = this.userHeading.replace(' (Loading...)', '');
    });
  }
}
