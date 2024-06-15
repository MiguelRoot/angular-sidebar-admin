import { Component } from '@angular/core';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isHidden = false;
  isCollapsed = false;
  showOverlay = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.sidebarVisible$.subscribe((isVisible) => {
      this.isHidden = !isVisible;
    });

    this.sidebarService.sidebarCollapsed$.subscribe((isCollapsed) => {
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
