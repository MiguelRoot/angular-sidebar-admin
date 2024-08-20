// src/app/sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public BREAKPOINTMD = 770;
  public BREAKPOINTLG = 1024;

  public WSIDEBARMIN = 120;
  public WSIDEBAR = 250;

  private wSidebarMargin = new BehaviorSubject<number>(0);
  wSidebarMargin$ = this.wSidebarMargin.asObservable();

  private sidebarVisible = new BehaviorSubject<boolean>(true);
  sidebarVisible$ = this.sidebarVisible.asObservable();

  private sidebar = new BehaviorSubject<boolean>(false);
  sidebar$ = this.sidebar.asObservable();

  private showOverlay = new BehaviorSubject<boolean>(false);
  showOverlay$ = this.showOverlay.asObservable();

  constructor() {
    this.updateSidebarState(window.innerWidth);
    window.addEventListener('resize', this.onResize.bind(this));
  }

  toggleSidebar() {
    if (window.innerWidth >= this.BREAKPOINTMD) {
      this.sidebar.next(!this.sidebar.value);
    } else {
      this.showOverlay.next(!this.showOverlay.value);
      this.sidebarVisible.next(!this.sidebarVisible.value);
    }
  }

  private onResize() {
    this.updateSidebarState(window.innerWidth);
  }

  private updateSidebarState(width: number) {
    if (width < this.BREAKPOINTMD) {
      this.sidebarVisible.next(false);
      this.sidebar.next(false);
      this.showOverlay.next(false);
    } else if (width >= this.BREAKPOINTMD && width < this.BREAKPOINTLG) {
      this.sidebarVisible.next(true);
      this.sidebar.next(true);
      this.showOverlay.next(false);
      this.wSidebarMargin.next(this.WSIDEBARMIN);
    } else {
      this.wSidebarMargin.next(this.WSIDEBAR);
      this.sidebarVisible.next(true);
    }
  }
}
