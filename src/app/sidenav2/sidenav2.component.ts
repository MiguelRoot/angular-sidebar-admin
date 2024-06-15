import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
//https://chatgpt.com/c/25e3444f-80d1-48bc-8a37-65c99a67e951
@Component({
  selector: 'app-sidenav2',
  templateUrl: './sidenav2.component.html',
  styleUrl: './sidenav2.component.scss',
  animations: [
    trigger('slide', [
      state('closed', style({ height: '0px', overflow: 'hidden' })),
      state('open', style({ height: '*', overflow: 'hidden' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class Sidenav2Component {
  isHoverMode = false; // Modo de menú desplegable
  defaultIcon = '&#x2731;'; // Icono predeterminado para los elementos secundarios
  data2 = [
    {
      title: 'titulo del grup',
      isOpen: true,
      children: [
        {
          title: 'Item 1',
          isOpen: false,
          icon: '&#x2764;',
          children: [
            {
              title: 'Subitem 1.1',
              isOpen: false,
              children: [
                {
                  title: 'Subitem 1.1.1',
                  isOpen: false,
                  routerLink: '/',
                },
              ],
            },
            {
              title: 'Subitem 1.2',
              isOpen: false,
              routerLink: '/',
            },
          ],
        },
        {
          title: 'Item 2',
          isOpen: false,
          icon: '&#x2764;',
          children: [
            {
              title: 'Subitem 2.1',
              isOpen: false,
            },
          ],
        },
        {
          title: 'Item 3',
          isOpen: false,
          icon: '&#x2764;',
          routerLink: '/',
        },
      ],
    },
    {
      title: 'titulo del grupo 2',
      isOpen: false,
      children: [
        {
          title: 'Item 1',
          isOpen: false,
          icon: '&#x2764;',
          routerLink: '/',
        },
        {
          title: 'Item 2',
          isOpen: false,
          icon: '&#x2764;',
          routerLink: '/',
        },
      ],
    },
  ];

  toggleVisible(item: any) {
    if (this.isHoverMode) {
      item.isOpen = false;
      return;
    }
    if (item.isOpen) {
      this.closeAllChildren(item);
    }
    item.isOpen = !item.isOpen;
  }

  closeAllChildren(item: any) {
    if (item.children) {
      item.children.forEach((child: any) => {
        child.isOpen = false;
        this.closeAllChildren(child);
      });
    }
  }

  getState(item: any) {
    // if (this.isHoverMode && item.children) return 'closed';
    return item.isOpen ? 'open' : 'closed';
  }

  getActiveValue(item: any) {
    return item.isOpen;
  }

  toggleMenuMode() {
    this.isHoverMode = !this.isHoverMode;
    this.data2.forEach((item: any) => {
      item.isOpen = false;
      this.closeAllChildren(item);
    });
  }
}
