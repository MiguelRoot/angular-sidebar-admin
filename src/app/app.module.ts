import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { Sidenav3Component } from './sidenav3/sidenav3.component';
import { SidebarComponent } from './sidenav3/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsCoreModule } from './core/components-core/components-core.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    Sidenav3Component,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgScrollbarModule,
    LayoutModule,
    ComponentsCoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
