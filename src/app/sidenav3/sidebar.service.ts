// src/app/sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarVisible = new BehaviorSubject<boolean>(true);
  sidebarVisible$ = this.sidebarVisible.asObservable();

  private sidebarCollapsed = new BehaviorSubject<boolean>(false);
  sidebarCollapsed$ = this.sidebarCollapsed.asObservable();

  private showOverlay = new BehaviorSubject<boolean>(false);
  showOverlay$ = this.showOverlay.asObservable();

  constructor() {
    this.updateSidebarState(window.innerWidth);
    window.addEventListener('resize', this.onResize.bind(this));
  }

  toggleSidebar() {
    if (window.innerWidth >= 770) {
      this.sidebarCollapsed.next(!this.sidebarCollapsed.value);
    } else {
      this.showOverlay.next(!this.showOverlay.value);
      this.sidebarVisible.next(!this.sidebarVisible.value);
    }
  }

  private onResize() {
    this.updateSidebarState(window.innerWidth);
  }

  private updateSidebarState(width: number) {
    if (width < 770) {
      this.sidebarVisible.next(false);
      this.sidebarCollapsed.next(false);
      this.showOverlay.next(false);
    } else {
      this.sidebarVisible.next(true);
    }
  }
}
