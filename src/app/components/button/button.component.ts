import { Component, Input, ElementRef, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'Button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  
  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.setAttribute('type', 'submit');
  }

}
