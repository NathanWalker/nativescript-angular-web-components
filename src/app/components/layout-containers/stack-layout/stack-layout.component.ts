import { Component, OnInit } from '@angular/core';
import { LabelComponent } from '../../label';
import { ImageComponent } from '../../image';

@Component({
  moduleId: module.id,
  selector: 'StackLayout',
  templateUrl: 'stack-layout.component.html',
  styleUrls: ['stack-layout.component.css'],
  directives: [LabelComponent, ImageComponent]
})
export class StackLayoutComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
