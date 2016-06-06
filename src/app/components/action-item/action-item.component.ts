import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ButtonComponent } from '../button/';

@Component({
  moduleId: module.id,
  selector: 'ActionItem',
  templateUrl: 'action-item.component.html',
  styleUrls: ['action-item.component.css'],
  directives: [ButtonComponent]
})
export class ActionItemComponent implements OnInit {
  @Input('ios.position') position: string;
  public positionClass: string;
  
  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.position === 'right') {
      let cls = 'btn-right';
      let currentClassName = this.el.nativeElement.className;
      this.el.nativeElement.className = currentClassName ? [currentClassName, cls].join(' ') : cls;
    }
  }

}
