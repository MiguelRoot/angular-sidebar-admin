import { Component, inject } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  layoutService = inject(LayoutService);

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }
}
