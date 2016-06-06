import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'Label',
  templateUrl: 'label.component.html',
  styleUrls: ['label.component.css']
})
export class LabelComponent implements OnInit {
  @Input() text: string;
  
  constructor() {}

  ngOnInit() {
  }

}
