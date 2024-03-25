import { Component } from '@angular/core';
import {SidenavService} from "./sidenav.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidenavComponent {
  menus: any[] = [];
  constructor(public sidenavService: SidenavService) {
    this.menus = sidenavService.getMenuList();
  }

  ngOnInit() {
  }

  getSideBarState() {
    return this.sidenavService.getSidebarState();
  }

  toggle(currentMenu: any) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu: any) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidenavService.hasBackgroundImage;
  }
}
