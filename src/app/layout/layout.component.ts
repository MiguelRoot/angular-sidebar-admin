import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  layoutService = inject(LayoutService);
  sidebarStyles: any;
  contentStyles: any;
  overlayShow = false;

  ngOnInit() {
    this.layoutService.getSidebarState().subscribe(() => {
      this.sidebarStyles = this.layoutService.getSidebarStyles();
      this.contentStyles = this.layoutService.getContentStyles();
      this.overlayShow = this.layoutService.getOverlayShow();
    });
  }

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }
}
