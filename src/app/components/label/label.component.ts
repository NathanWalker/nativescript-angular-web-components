import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'Label',
  templateUrl: 'label.component.html',
  styleUrls: ['label.component.css']
})
export class LabelComponent {
  @Input() text: string;
}
