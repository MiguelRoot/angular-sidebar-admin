import { Component, inject } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  layoutService = inject(LayoutService);
  logobarStyles: any;
  isCampactMode = 'menu';

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  ngOnInit() {
    this.layoutService.getSidebarState().subscribe(() => {
      this.logobarStyles = this.layoutService.getLogoBarStyles();
      this.isCampactMode = this.layoutService.getIconMenu();
    });
  }
}
