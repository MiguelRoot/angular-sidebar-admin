import { Component } from '@angular/core';
import {SidenavService} from "./sidenav/sidenav.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sidenav-angular';
  constructor(public sidenavService: SidenavService) { }
  toggleSidebar() {
    this.sidenavService.setSidebarState(!this.sidenavService.getSidebarState());
    // console.log(this.sidenavService.getSidebarState())
  }
  toggleBackgroundImage() {
    this.sidenavService.hasBackgroundImage = !this.sidenavService.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidenavService.getSidebarState();
  }

  hideSidebar() {
    this.sidenavService.setSidebarState(true);
  }
}
