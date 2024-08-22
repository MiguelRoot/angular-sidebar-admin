// src/app/sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISidebarState } from './layout.model';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly BREAKPOINTMD = 770;
  private readonly BREAKPOINTLG = 1024;

  private readonly WSIDEBARCOMPACT = 100;
  private readonly WSIDEBAREXPANDED = 250;

  private sidebarState = new BehaviorSubject<ISidebarState>(
    ISidebarState.Hidden
  );

  constructor() {
    this.updateSidebarState();
    window.addEventListener('resize', () => this.updateSidebarState());
  }

  getSidebarState() {
    return this.sidebarState.asObservable();
  }

  // toggle sidebar
  toggleSidebar() {
    const screenWidth = window.innerWidth;
    const currentState = this.sidebarState.value;

    if (screenWidth >= this.BREAKPOINTMD) {
      // Alternar entre Expanded y Compact en pantallas medianas y grandes
      this.sidebarState.next(
        currentState === ISidebarState.Expanded
          ? ISidebarState.Compact
          : ISidebarState.Expanded
      );
    } else {
      // Alternar entre Hidden y Expanded en pantallas pequeñas
      this.sidebarState.next(
        currentState === ISidebarState.Hidden
          ? ISidebarState.Expanded
          : ISidebarState.Hidden
      );
    }
  }

  getSidebarWidth() {
    const currentState = this.sidebarState.value;

    switch (currentState) {
      case ISidebarState.Expanded:
        return this.WSIDEBAREXPANDED;
      case ISidebarState.Compact:
        return this.WSIDEBARCOMPACT;
      case ISidebarState.Hidden:
      default:
        return this.WSIDEBAREXPANDED;
    }
  }

  getSidebarStyles() {
    const width = `${this.getSidebarWidth()}px`;
    const currentState = this.sidebarState.value;
    return {
      width: width,
      // position: window.innerWidth < this.BREAKPOINTMD ? 'fixed' : 'relative',
      // display: currentState === ISidebarState.Hidden ? 'none' : 'block',
      transform:
        currentState === ISidebarState.Hidden
          ? 'translateX(-100%)'
          : 'translateX(0)',
    };
  }

  /**
   * Cambia el menu de compact = false, expanded = true.
   *
   * @returns {boolean} `true` si el estado de la barra lateral está expandido, de lo contrario `false`.
   */
  getSidebarSatatusMenu(): boolean {
    const screenWidth = window.innerWidth;
    const currentState = this.sidebarState.value;

    if (screenWidth < this.BREAKPOINTMD) {
      return false;
    }

    let marginLeft = true;
    if (currentState === ISidebarState.Expanded) {
      marginLeft = false;
    } else if (currentState === ISidebarState.Compact) {
      marginLeft = true;
    }

    return marginLeft;
  }

  getTextMenuShow() {
    const screenWidth = window.innerWidth;
    const currentState = this.sidebarState.value;
    if (screenWidth < this.BREAKPOINTMD) {
      return false;
    }
    if (currentState === ISidebarState.Compact) {
      return false;
    }
    return true;
  }

  getIconMenu(): string {
    const screenWidth = window.innerWidth;
    const currentState = this.sidebarState.value;

    if (
      currentState === ISidebarState.Expanded &&
      screenWidth < this.BREAKPOINTMD
    ) {
      return 'arrow-left';
    } else if (currentState === ISidebarState.Compact) {
      return 'menu-right';
    } else {
      return 'menu-line';
    }
  }

  getLogoBarStyles() {
    const screenWidth = window.innerWidth;
    const currentState = this.sidebarState.value;
    let width = `${this.WSIDEBARCOMPACT}px`;

    if (screenWidth >= this.BREAKPOINTMD) {
      width =
        currentState === ISidebarState.Expanded
          ? `${this.WSIDEBAREXPANDED}px`
          : `${this.WSIDEBARCOMPACT}px`;
    }
    return { width: width };
  }

  getContentStyles() {
    const screenWidth = window.innerWidth;
    const currentState = this.sidebarState.value;

    if (screenWidth < this.BREAKPOINTMD) {
      return { marginLeft: '0px' };
    }

    let marginLeft = '0px';
    if (currentState === ISidebarState.Expanded) {
      marginLeft = `${this.WSIDEBAREXPANDED}px`;
    } else if (currentState === ISidebarState.Compact) {
      marginLeft = `${this.WSIDEBARCOMPACT}px`;
    }

    return { marginLeft: marginLeft };
  }

  getOverlayShow() {
    const screenWidth = window.innerWidth;
    if (
      screenWidth < this.BREAKPOINTMD &&
      this.sidebarState.value === ISidebarState.Expanded
    ) {
      return true;
    }
    return false;
  }

  private updateSidebarState() {
    const screenWidth = window.innerWidth;

    if (screenWidth < this.BREAKPOINTMD) {
      this.sidebarState.next(ISidebarState.Hidden);
    } else if (screenWidth < this.BREAKPOINTLG) {
      this.sidebarState.next(ISidebarState.Compact);
    } else {
      this.sidebarState.next(ISidebarState.Expanded);
    }
  }
}
