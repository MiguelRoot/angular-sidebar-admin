import { Component } from '@angular/core';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isHidden = false;
  isCollapsed = false;
  showOverlay = false;

  constructor(private sidebarService: LayoutService) {
    this.sidebarService.sidebarVisible$.subscribe((isVisible) => {
      this.isHidden = !isVisible;
    });

    this.sidebarService.sidebar$.subscribe((isCollapsed) => {
      this.isCollapsed = isCollapsed;
    });

    this.sidebarService.showOverlay$.subscribe((showOverlay) => {
      this.showOverlay = showOverlay;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
