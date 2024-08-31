import { NgModule } from '@angular/core';
import { HoverMenuDirective } from './hover-menu.directive';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LogobarComponent } from './logobar/logobar.component';
import { SidebarComponent } from './sidebar/sidenav.component';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
@NgModule({
  declarations: [
    HoverMenuDirective,
    ToolbarComponent,
    LayoutComponent,
    SidebarComponent,
    LogobarComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, OverlayscrollbarsModule],
  exports: [HoverMenuDirective],
})
export class LayoutModule {}
