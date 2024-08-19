import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import {
  computePosition,
  autoUpdate,
  flip,
  shift,
  offset,
} from '@floating-ui/dom';

@Directive({
  selector: '[appHoverMenu]',
})
export class HoverWrapDirective {
  @Input('appHoverMenu') isEnabled: boolean = true; // Input para habilitar/deshabilitar la directiva

  private wrapEl: HTMLElement | null = null;
  private cleanupAutoUpdate: (() => void) | null = null;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.isEnabled) return; // Si está deshabilitado, salir del método

    this.wrapEl = this.el.nativeElement.querySelector('.sidenav__wrap');
    if (this.wrapEl) {
      // this.wrapEl.classList.remove('hidden');

      // Compute position with flip and shift strategies
      computePosition(this.el.nativeElement, this.wrapEl, {
        placement: 'right',
        middleware: [
          offset({ mainAxis: 10 }), // Adds some space between the item and the wrap
          flip(), // Flip the wrap to the left if there's not enough space to the right
          shift({ padding: 5 }), // Adjust vertically if there’s not enough space
        ],
      }).then(({ x, y }) => {
        Object.assign(this.wrapEl!.style, {
          //   left: `${x}px`,
          top: `${y}px`,
        });
      });

      //   // Start auto-update to adjust position if necessary
      //   this.cleanupAutoUpdate = autoUpdate(
      //     this.el.nativeElement,
      //     this.wrapEl,
      //     () => {
      //       computePosition(this.el.nativeElement, this.wrapEl!, {
      //         placement: 'right',
      //         middleware: [
      //           offset({ mainAxis: 10 }),
      //           flip(),
      //           shift({ padding: 5 }),
      //         ],
      //       }).then(({ x, y }) => {
      //         Object.assign(this.wrapEl!.style, {
      //         //   left: `${x}px`,
      //           top: `${y}px`,
      //         });
      //       });
      //     }
      //   );
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (!this.isEnabled) return; // Si está deshabilitado, salir del método
    if (this.wrapEl) {
      // this.wrapEl.classList.add('hidden');

      if (this.cleanupAutoUpdate) {
        this.cleanupAutoUpdate();
        this.cleanupAutoUpdate = null;
      }
    }
  }
}
