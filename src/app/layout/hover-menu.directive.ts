import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';

@Directive({
  selector: '[appHoverMenu]',
})
export class HoverMenuDirective {
  @Input('appHoverMenu') isEnabled: boolean = true;

  private wrapEl: HTMLElement | null = null;

  constructor(private el: ElementRef) {}

  /**
   * @hostListener mouseenter
   * Maneja el evento cuando el puntero del mouse entra en el elemento host.
   * Si la funcionalidad está habilitada (`isEnabled`), calcula la posición de un elemento
   * secundario con la clase `.sidenav__wrap` y ajusta su posición en el eje vertical (`top`).
   *
   * Utiliza la función `computePosition` para determinar la posición del elemento
   * basado en la configuración de middleware, que incluye:
   * - `offset`: Desplazamiento principal de 10 píxeles.
   * - `flip`: Permite voltear la posición si no cabe en el espacio disponible.
   * - `shift`: Ajusta la posición con un relleno de 5 píxeles.
   *
   * @returns {void}
   */
  @HostListener('mouseenter') onMouseEnter() {
    if (!this.isEnabled) return;

    this.wrapEl = this.el.nativeElement.querySelector('.sidenav__wrap');
    if (this.wrapEl) {
      computePosition(this.el.nativeElement, this.wrapEl, {
        placement: 'right',
        middleware: [offset({ mainAxis: 10 }), flip(), shift({ padding: 5 })],
      }).then(({ x, y }) => {
        Object.assign(this.wrapEl!.style, {
          top: `${y}px`,
        });
      });
    }
  }
}
