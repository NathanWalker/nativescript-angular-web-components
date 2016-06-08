import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ActionItem',
  templateUrl: 'action-item.component.html',
  styleUrls: ['action-item.component.css']
})
export class ActionItemComponent implements OnInit {
  @Input('ios.position') iosPosition: string;
  @Input('android.position') androidPosition: string;
  
  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.iosPosition === 'right' || this.androidPosition === 'popup') {
      let cls = 'btn-right';
      let currentClassName = this.el.nativeElement.className;
      this.el.nativeElement.className = currentClassName ? [currentClassName, cls].join(' ') : cls;
    }
  }
}
