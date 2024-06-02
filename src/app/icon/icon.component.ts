import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() size = 24;
  @Input() name = 'default';

  constructor() { }

  isName() {
    // return (this.name ==)
  }
}
