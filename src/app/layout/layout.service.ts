// src/app/sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISidebarState } from './layout.model';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly BREAKPOINTMD = 770; // breakpoint para pantallas medianas
  private readonly BREAKPOINTLG = 1024; // breakpoint para pantallas grandes

  private readonly WSIDEBARCOMPACT = 100; // ancho de la barra lateral compacta
  private readonly WSIDEBAREXPANDED = 250; // ancho de la barra lateral expandida

  private sidebarState = new BehaviorSubject<ISidebarState>(
    ISidebarState.Hidden
  );

  constructor() {
    this.updateSidebarState();
    window.addEventListener('resize', () => this.updateSidebarState());
  }

  /**
   * Obtiene el estado actual de la barra lateral como un observable.
   *
   * @returns {Observable<any>} Un observable que emite el estado de la barra lateral.
   */
  getSidebarState() {
    return this.sidebarState.asObservable();
  }

  /**
   * Alterna el estado de la barra lateral (sidebar) basado en el ancho de la pantalla.
   *
   * - En pantallas medianas y grandes (ancho mayor o igual a `BREAKPOINTMD`), alterna entre
   *   los estados `Expanded` y `Compact`.
   * - En pantallas pequeñas (ancho menor a `BREAKPOINTMD`), alterna entre los estados
   *   `Hidden` y `Expanded`.
   *
   * @remarks
   * Utiliza el ancho de la ventana (`window.innerWidth`) para determinar el tamaño de la pantalla.
   *
   * @example
   * ```typescript
   * this.toggleSidebar();
   * ```
   */
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

  /**
   * Obtiene el ancho de la barra lateral basado en el estado actual de la misma.
   *
   * @returns {number} El ancho de la barra lateral dependiendo de su estado:
   * - `ISidebarState.Expanded`: retorna `WSIDEBAREXPANDED`.
   * - `ISidebarState.Compact`: retorna `WSIDEBARCOMPACT`.
   * - `ISidebarState.Hidden` o cualquier otro valor: retorna `WSIDEBAREXPANDED`.
   */
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

  /**
   * Obtiene los estilos del sidebar.
   *
   * @returns Un objeto con los estilos del sidebar, incluyendo el ancho y la transformación.
   * El ancho se calcula en píxeles basado en el ancho del sidebar.
   * La transformación se aplica dependiendo del estado actual del sidebar.
   * Si el estado es `ISidebarState.Hidden`, el sidebar se desplaza fuera de la vista.
   * Si el estado es visible, el sidebar se muestra en su posición original.
   */
  getSidebarStyles() {
    const width = `${this.getSidebarWidth()}px`;
    const currentState = this.sidebarState.value;
    return {
      width: width,
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

  /**
   * Determina si el texto del menú debe mostrarse basado en el ancho de la pantalla y el estado actual de la barra lateral.
   *
   * @returns {boolean} `true` si el texto del menú debe mostrarse, `false` en caso contrario.
   */
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

  /**
   * Obtiene el icono del menú basado en el estado actual de la barra lateral y el ancho de la pantalla.
   *
   * @returns {string} El nombre del icono del menú.
   */
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

  /**
   * Obtiene los estilos de la barra de logotipo en función del ancho de la pantalla y el estado actual de la barra lateral.
   *
   * @returns Un objeto con el ancho de la barra de logotipo.
   */
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

  /**
   * Obtiene los estilos de contenido basados en el ancho de la pantalla y el estado actual de la barra lateral.
   *
   * @returns Un objeto con el estilo de margen izquierdo (`marginLeft`) adecuado según el ancho de la pantalla y el estado de la barra lateral.
   */
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

  /**
   * Determina si se debe mostrar una superposición (overlay) basada en el ancho de la pantalla y el estado de la barra lateral.
   *
   * @returns {boolean} `true` si el ancho de la pantalla es menor que el punto de interrupción definido y el estado de la barra lateral es expandido; de lo contrario, `false`.
   */
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

  /**
   * Actualiza el estado de la barra lateral basado en el ancho de la pantalla.
   *
   * - Si el ancho de la pantalla es menor que `BREAKPOINTMD`, la barra lateral se oculta.
   * - Si el ancho de la pantalla es menor que `BREAKPOINTLG` pero mayor o igual a `BREAKPOINTMD`, la barra lateral se compacta.
   * - Si el ancho de la pantalla es mayor o igual a `BREAKPOINTLG`, la barra lateral se expande.
   *
   * @private
   */
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
