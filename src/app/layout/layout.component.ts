import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  layoutService = inject(LayoutService);

  isHidden = false;
  showOverlay = false;
  isCollapsed = false;

  ///
  isSidebarHidden = false;
  // true sidebarmini;
  isSidebarMin = false;

  fullWidth = this.isSidebarHidden ? '0' : '250px';

  ngOnInit() {
    this.layoutService.sidebarVisible$.subscribe((isVisible) => {
      this.isSidebarHidden = !isVisible;
    });

    this.layoutService.sidebar$.subscribe((isCollapsed) => {
      console.log('isCollapsed', isCollapsed);
      this.isSidebarMin = isCollapsed;
    });

    // sidebar
    this.layoutService.sidebarVisible$.subscribe((isVisible) => {
      this.isHidden = !isVisible;
    });

    this.layoutService.sidebar$.subscribe((isCollapsed) => {
      this.isCollapsed = isCollapsed;
    });

    this.layoutService.showOverlay$.subscribe((showOverlay) => {
      this.showOverlay = showOverlay;
    });
  }
}
