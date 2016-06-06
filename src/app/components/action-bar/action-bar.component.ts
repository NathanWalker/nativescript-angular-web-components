import { Component, OnInit, Input } from '@angular/core';
import { ActionItemComponent } from '../action-item/';

@Component({
  moduleId: module.id,
  selector: 'ActionBar',
  templateUrl: 'action-bar.component.html',
  styleUrls: ['action-bar.component.css'],
  directives: [ActionItemComponent]
})
export class ActionBarComponent implements OnInit {
  @Input() title: string;
  
  constructor() {}

  ngOnInit() {
  }

}
