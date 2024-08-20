import { NgModule } from '@angular/core';
import { HoverMenuDirective } from './hover-menu.directive';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HoverMenuDirective,
    ToolbarComponent,
    LayoutComponent,
    SidenavComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [HoverMenuDirective],
})
export class LayoutModule {}
