import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidenav3',
  templateUrl: './sidenav3.component.html',
  styleUrl: './sidenav3.component.scss',
})
export class Sidenav3Component {
  isSidebarHidden = false;
  isSidebarCollapsed = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.sidebarVisible$.subscribe((isVisible) => {
      this.isSidebarHidden = !isVisible;
    });

    this.sidebarService.sidebarCollapsed$.subscribe((isCollapsed) => {
      this.isSidebarCollapsed = isCollapsed;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
