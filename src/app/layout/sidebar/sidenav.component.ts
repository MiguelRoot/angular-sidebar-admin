import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, inject } from '@angular/core';
import { IMenuHeader, IMenuItem } from '../layout.model';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('slide', [
      state('closed', style({ height: '0px', overflow: 'hidden' })),
      state('open', style({ height: '*', overflow: 'hidden' })),
      transition('closed <=> open', [animate('{{timing}} ease-in-out')], {
        params: { timing: '300ms' },
      }),
    ]),
  ],
})
export class SidebarComponent {
  layoutService = inject(LayoutService);
  isHoverMode = false; // Modo de menú Compact=true
  iconDefault = 'bullet'; // Icono predeterminado para los elementos secundarios
  paddingleft = 12; // Espaciado a la izquierda de los elementos secundarios
  timing = '300ms'; // Valor por defecto
  optionsScroll: any = {
    compact: { scrollbars: { visibility: 'hidden' } },
    expand: {
      scrollbars: {
        autoHide: 'leave',
        autoHideDelay: 100,
      },
    },
  };
  currentOptionsScroll = this.optionsScroll.compact;

  menuData: IMenuHeader[] = [
    {
      header: 'MENU',
      menu: [
        {
          title: 'Item 1',
          isExpanded: false,
          icon: 'blocks',
          children: [
            {
              title: 'Subitem 1.1',
              isExpanded: false,
              children: [
                {
                  title: 'Subitem 1.1.1',
                  isExpanded: false,
                  routerLink: '/',
                },
              ],
            },
            {
              title: 'Subitem 1.2',
              isExpanded: false,
              routerLink: '/',
            },
          ],
        },
        {
          title: 'Item 2',
          isExpanded: false,
          icon: 'blocks',
          children: [
            {
              title: 'Subitem 2.1',
              isExpanded: false,
            },
          ],
        },
        {
          title: 'Item 3',
          isExpanded: false,
          icon: 'blocks',
          routerLink: '/',
        },
      ],
    },
    {
      header: 'titulo del grupo 2',
      menu: [
        {
          title: 'Item 1',
          isExpanded: false,
          icon: 'blocks',
          routerLink: '/',
        },

        {
          title: 'Item 2',
          isExpanded: false,
          icon: 'blocks',
          routerLink: '/',
        },
        {
          title: 'Item 2',
          isExpanded: false,
          icon: 'blocks',
          routerLink: '/',
        },
        {
          title: 'Item 2',
          isExpanded: false,
          icon: 'blocks',
          routerLink: '/',
        },
        {
          title: 'Item 2',
          isExpanded: false,
          icon: 'blocks',
          routerLink: '/',
        },
        {
          title: 'Item 2',
          isExpanded: false,
          icon: 'blocks',
          routerLink: '/',
        },
        {
          title: 'Item 2',
          isExpanded: false,
          icon: 'blocks',
          routerLink: '/',
        },
        {
          title: 'Item 2',
          isExpanded: false,
          icon: 'blocks',
          routerLink: '/',
        },
        {
          title: 'Item 2',
          isExpanded: false,
          icon: 'blocks',
          routerLink: '/',
        },
        {
          title: 'Item 2',
          isExpanded: false,
          icon: 'blocks',
          routerLink: '/',
        },
      ],
    },
  ];

  ngOnInit() {
    this.layoutService.getSidebarState().subscribe(() => {
      if (this.isHoverMode !== this.layoutService.getSidebarSatatusMenu()) {
        this.menuData.forEach((item: IMenuHeader) => {
          this.hideAllChildItems(item.menu);
        });
      }
      this.isHoverMode = this.layoutService.getSidebarSatatusMenu();
      this.currentOptionsScroll = this.isHoverMode
        ? this.optionsScroll.compact
        : this.optionsScroll.expand;
    });
  }

  /**
   * Cambia el estado expandido de un elemento de menú.
   *
   * @param item - El elemento de menú a cambiar.
   */
  toggleExpanded(item: IMenuItem) {
    if (this.isHoverMode) {
      item.isExpanded = false;
      return;
    }
    if (item.isExpanded && item.children) {
      this.hideAllChildItems(item.children);
    }
    item.isExpanded = !item.isExpanded;
  }

  /**
   * Obtiene el estado de un elemento.
   * @param item El elemento del menú.
   * @returns El estado del elemento, puede ser 'open' si está expandido o 'closed' si está cerrado.
   */
  getItemState(item: IMenuItem) {
    this.timing = this.isHoverMode ? '0ms' : '300ms';
    return {
      value: item.isExpanded ? 'open' : 'closed',
      params: { timing: this.timing },
    };
  }

  /**
   * Comprueba si un elemento de menú está expandido.
   *
   * @param item - El elemento de menú a comprobar.
   * @returns `true` si el elemento está expandido, de lo contrario `false`.
   */
  isItemExpanded(item: IMenuItem) {
    return item.isExpanded;
  }

  /**
   * Cambia el modo del menú entre el modo de desplazamiento y el modo sin desplazamiento.
   *
   * @remarks
   * Este método actualiza la propiedad `isHoverMode` a su valor opuesto y oculta todos los elementos secundarios del menú.
   */
  changeToggleMenu() {
    this.isHoverMode = !this.isHoverMode;
    this.menuData.forEach((item: IMenuHeader) => {
      this.hideAllChildItems(item.menu);
    });
  }

  /**
   * Oculta todos los elementos secundarios de un elemento de menú.
   * @param item - El arreglo de elementos de menú.
   */
  private hideAllChildItems(item: IMenuItem[]) {
    item.forEach((child: IMenuItem) => {
      child.isExpanded = false;
      if (child.children) {
        this.hideAllChildItems(child.children);
      }
    });
  }

  hasIcon(icon: string) {
    return icon || this.iconDefault;
  }
}
