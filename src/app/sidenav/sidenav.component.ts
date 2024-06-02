import {Component} from '@angular/core';
import {SidenavService} from "./sidenav.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

interface MenuItem {
  index?: number;
  title: string;
  icon?: string;
  active?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  animations: [
    trigger('slide', [
      state('up', style({height: 0})),
      state('down', style({height: '*'})),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidenavComponent {
  menus: any[] = [];
  data2: any = []
  active: any = {};

  data: any = [
    {
      title: 'Apps',
      icon: 'fas fa-envelope',
      active: true,
      children: [
        {
          title: 'Profile',
          url: './app-profile.html'
        },
        {
          title: 'Email',
          active: false,
          children: [{
            title: 'Compose',
            url: './email-compose.html'
          },
            {
              title: 'Inbox',
              url: './email-inbox.html'
            },
            {
              title: 'Read',
              url: './email-read.html'
            }]
        },
        {
          title: 'Calendar',
          url: './app-calender.html'
        },
        {
          title: 'Shop',
          active: false,
          children: [{
            title: 'Product Grid',
            url: './ecom-product-grid.html'
          }, {
            title: 'Product List',
            url: './ecom-product-list.html'
          }, {
            title: 'Product Details',
            url: './ecom-product-detail.html'
          }, {
            title: 'Order',
            url: './ecom-product-order.html'
          }, {
            title: 'Checkout',
            url: './ecom-checkout.html'
          }, {
            title: 'Invoice',
            url: './ecom-invoice.html'
          }, {
            title: 'Customers',
            url: './ecom-customers.html'
          }]
        }]
    },
    {
      title: 'Apps',
      icon: 'fas fa-envelope',
      active: true,
      children: [
        {
          title: 'Profile',
          url: './app-profile.html'
        },
        {
          title: 'Email',
          active: false,
          children: [{
            title: 'Compose',
            url: './email-compose.html'
          },
            {
              title: 'Inbox',
              url: './email-inbox.html'
            },
            {
              title: 'Read',
              url: './email-read.html'
            }]
        },
        {
          title: 'Calendar',
          url: './app-calender.html'
        },
        {
          title: 'Shop',
          active: false,
          children: [{
            title: 'Product Grid',
            url: './ecom-product-grid.html'
          }, {
            title: 'Product List',
            url: './ecom-product-list.html'
          }, {
            title: 'Product Details',
            url: './ecom-product-detail.html'
          }, {
            title: 'Order',
            url: './ecom-product-order.html'
          }, {
            title: 'Checkout',
            url: './ecom-checkout.html'
          }, {
            title: 'Invoice',
            url: './ecom-invoice.html'
          }, {
            title: 'Customers',
            url: './ecom-customers.html'
          }]
        }]
    }
  ]


  agregarIDActivos(data: MenuItem[], idInicial: number = 1): MenuItem[] {
    return data.map(menuItem => {
      const newItem: MenuItem = { ...menuItem }; // Crear un nuevo objeto para no mutar el original
      // if (menuItem.active) {
        newItem.index = idInicial++;
      // }
      if (menuItem.children) {
        newItem.children = this.agregarIDActivos(menuItem.children, idInicial);
      }
      return newItem;
    });
  }

  toggleVisible(node: any) {
    console.log(node);
    if (node.children) {
      if (this.active[node.index]) {
        this.active[node.index] = false;
      } else {
        this.active[node.index] = true;
      }
    }
  }

  getActiveValue(node: any) {
    if(this.active[node.index]) {
       return true;
    } else {
      return false;
    }
  }


  constructor(public sidenavService: SidenavService) {
    this.menus = sidenavService.getMenuList();
    this.data2 = this.agregarIDActivos(this.data);
  }

  ngOnInit() {
  }

  getSideBarState() {
    return this.sidenavService.getSidebarState();
  }

  toggle(currentMenu: any) {

    console.log(currentMenu, 'currentMenu');

    // if (currentMenu.type === 'dropdown') {
    //   this.menus.forEach(element => {
    //     if (element === currentMenu) {
    //       currentMenu.active = !currentMenu.active;
    //     } else {
    //       element.active = false;
    //     }
    //   });
    // }
  }

  getState(currentMenu: any) {
    if (this.active[currentMenu.index]) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidenavService.hasBackgroundImage;
  }
}
